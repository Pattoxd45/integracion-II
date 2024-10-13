require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto definido en .env o por defecto el 3000

// Middleware
const allowedOrigins = [
  'http://localhost:3001',
  'http://magicarduct.online',
  'http://localhost:3000',
  'http://localhost:8081', // Tu m�quina local
  'http://186.64.122.218:3000',  // IP del host remoto
  'http://186.64.122.218', // Otro dominio permitido
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Configuraci�n de sesiones utilizando el secreto desde el archivo .env
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());

// Conexi�n a la base de datos MySQL utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Middleware para verificar que el usuario est� autenticado
const isAuthenticated = (req, res, next) => {
  console.log('TOY AUTENTICAO WEBON!:', req.session.userId);
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
};


// Endpoint de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Datos de inicio de sesi�n:', req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contrase�a son requeridos.' });
  }

  const query = 'SELECT idusuario FROM usuario WHERE correo = ? AND clave = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    console.log('Resultados de la consulta:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Correo o contrase�a incorrectos.' });
    }

    // Iniciar sesi�n
    req.session.userId = results[0].idusuario;
    console.log('pene:', req.session);
    res.status(200).json({ message: 'Inicio de sesi�n exitoso', userId: results[0].idusuario });
    console.log('Funciono esta mierda o no?: ', results[0].idusuario);
  });
});
//Endpoint del logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error cerrando sesión' });
    }
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  });
});
app.post('/register', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { nombre, correo, clave } = req.body;

  if (!nombre || !correo || !clave) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Verificar si el correo ya existe
  const checkQuery = 'SELECT * FROM usuario WHERE correo = ?';
  db.query(checkQuery, [correo], (err, results) => {
    if (err) {
      console.error('Error al verificar el correo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al verificar el correo' });
    }

    if (results.length > 0) {
      console.log('El correo ya está registrado'); // Mensaje de correo repetido
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Insertar el nuevo usuario si el correo no está repetido
    const query = 'INSERT INTO usuario (nombre, correo, clave) VALUES (?, ?, ?)';
    db.query(query, [nombre, correo, clave], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err); // Mensaje de error
        return res.status(500).json({ error: 'Error al registrar el usuario' });
      }
      res.status(200).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

//Obtener datos de usuario
app.get('/obtener-usuario', (req, res) => {
  const userId = req.query.userId; // Obtén el userId de los parámetros de consulta

  console.log('TENGO ESTO CAUSA:', userId); // Imprime el userId recibido

  // Consulta a la base de datos
  const query = 'SELECT nombre, correo, foto FROM usuario WHERE idusuario = ?';
  
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0]; // Asumiendo que solo habrá un resultado
      // Asegúrate de devolver el correo correctamente
      res.json({ userName: usuario.nombre, email: usuario.correo, image: usuario.foto });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});
app.get('/usuario', isAuthenticated, (req, res) => {
  const userId = req.session.userId;
  
  const query = 'SELECT nombre, correo FROM usuario WHERE idusuario = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userData = results[0];
    res.json(userData);
  });
});

// POST: /api/mazocartas
app.post('/api/mazocartas', async (req, res) => {
  const { IDcarta, IDmazo, cantidad } = req.body;

  if (!IDcarta || !IDmazo || !cantidad) {
    return res.status(400).json({ error: 'Faltan par�metros requeridos' });
  }

  const query = `INSERT INTO mazo_cartas (IDmazo, IDcarta, cantidad) VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE cantidad = VALUES(cantidad)`;

  try {
    await db.execute(query, [IDcarta, IDmazo, cantidad]);
    res.status(200).json({ message: 'Carta a�adida al mazo correctamente' });
  } catch (error) {
    console.error('Error al a�adir carta al mazo:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene todas las barajas de un usuario específico por su ID
app.get('/api/barajasdeusuaio/:IDusuario', async (req, res) => {
  const { IDusuario } = req.params;

  const query = `SELECT * FROM barajas_de_usuario WHERE id_usuario = ?`;

  try {
    const [rows] = await db.execute(query, [IDusuario]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No se encontraron barajas' });
    }
  } catch (error) {
    console.error('No se encontraron barajas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene todas las cartas de un mazo específico por su ID
app.get('/api/mazocartas/:IDmazo', async (req, res) => {
  const { IDmazo } = req.params;

  const query = `SELECT * FROM mazo_cartas WHERE IDmazo = ?`;

  try {
    const [rows] = await db.execute(query, [IDmazo]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No se encontr� la carta en el mazo' });
    }
  } catch (error) {
    console.error('Error al obtener la carta del mazo:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET: Obtiene información de una baraja específica por su ID
app.get('/api/barajas/:IDbarajas', async (req, res) => {
  const { IDbarajas } = req.params;

  const query = `SELECT * FROM barajas WHERE idbarajas = ?`;

  try {
    const [rows] = await db.execute(query, [IDbarajas]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: 'No se encontro informacion del mazo' });
    }
  } catch (error) {
    console.error('No se encontro informacion del mazo', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST: Crea un nuevo mazo y lo asocia a un usuario específico
app.post('/api/createmazo', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { nombre, formato, descripcion, idusuario } = req.body;

  if (!nombre || !formato || !descripcion || !idusuario) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para insertar el nuevo mazo
  const queryMazo = 'INSERT INTO barajas (nombre, formato, descripcion) VALUES (?, ?, ?)';
  db.query(queryMazo, [nombre, formato, descripcion], (err, result) => {
    if (err) {
      console.error('Error al crear mazo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al crear mazo' });
    }

    // Obtiene el ID del nuevo mazo
    const nuevoMazoId = result.insertId;
    console.log('Nuevo mazo creado con ID:', nuevoMazoId);

    // Consulta para asociar el nuevo mazo al usuario
    const queryUsuarioMazo = 'INSERT INTO barajas_de_usuario (id_usuario, id_baraja) VALUES (?, ?)';
    db.query(queryUsuarioMazo, [idusuario, nuevoMazoId], (err) => {
      if (err) {
        console.error('Error al asociar el mazo al usuario:', err); // Mensaje de error
        return res.status(500).json({ error: 'Error al asociar el mazo al usuario' });
      }
      
      // Respuesta final
      res.status(200).json({ message: 'Mazo creado y asociado exitosamente', id: nuevoMazoId });
    });
  });
});


// PUT: Actualiza un mazo existente con los datos proporcionados por su ID
app.put('/api/actualizarmazo/:id', (req, res) => {
  const mazoId = req.params.id; // Obtiene el ID del usuario de los parámetros
  const { nombre, formato, descripcion } = req.body; // Obtiene el nombre del cuerpo de la solicitud

  if (!nombre || !formato || !descripcion) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE barajas SET nombre = ?, formato = ?, descripcion = ? WHERE idbarajas = ?';
  
  db.query(query, [nombre, formato, descripcion, mazoId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el mazo:', err);
      return res.status(500).json({ error: 'Error al actualizar el mazo' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mazo no encontrado' });
    }

    res.status(200).json({ message: 'Mazo actualizado exitosamente' });
  });
});

// DELETE: Elimina un mazo específico y sus referencias asociadas
app.delete('/api/eliminarmazo/:id', (req, res) => {
  const mazoId = req.params.id; // Obtiene el ID del mazo de los parámetros de la URL

  if (!mazoId) {
    return res.status(400).json({ error: 'ID del mazo es requerido' });
  }

  // Primero, eliminamos las referencias en la tabla de relación mazo_cartas
  const deleteMazoCartasQuery = 'DELETE FROM mazo_cartas WHERE IDmazo = ?';
  db.query(deleteMazoCartasQuery, [mazoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar las referencias en mazo_cartas:', err);
      return res.status(500).json({ error: 'Error al eliminar las referencias en mazo_cartas' });
    }

    // Luego, eliminamos las referencias en la tabla de relación barajas_de_usuario
    const deleteRelacionQuery = 'DELETE FROM barajas_de_usuario WHERE idbarajas_de_usuario = ?';
    db.query(deleteRelacionQuery, [mazoId], (err, result) => {
      if (err) {
        console.error('Error al eliminar las referencias del mazo en barajas_de_usuario:', err);
        return res.status(500).json({ error: 'Error al eliminar las referencias del mazo en barajas_de_usuario' });
      }

      // Finalmente, eliminamos el mazo de la tabla barajas
      const deleteMazoQuery = 'DELETE FROM barajas WHERE idbarajas = ?';
      db.query(deleteMazoQuery, [mazoId], (err, result) => {
        if (err) {
          console.error('Error al eliminar el mazo:', err);
          return res.status(500).json({ error: 'Error al eliminar el mazo' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Mazo no encontrado' });
        }

        res.status(200).json({ message: 'Mazo eliminado exitosamente' });
      });
    });
  });
});

// POST: Agrega cartas a un mazo específico
app.post('/api/mazocartas', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { idmazo, idcarta, cantidad } = req.body;

  if (!idmazo || !idcarta || !cantidad) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  const query = 'INSERT INTO mazo_cartas (IDmazo, IDcarta, cantidad) VALUES (?, ?, ?)';
  db.query(query, [idmazo, idcarta, cantidad], (err, result) => {
    if (err) {
      console.error('Error al crear mazo:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al crear mazo:' });
    }
    res.status(200).json({ message: 'Mazo creado exitosamente' });
  });
});

// PUT: Actualiza la cantidad de una carta en un mazo específico
app.put('/api/actualizarmazocartas/:idmazo/:idcarta', (req, res) => {
  const { mazoId, IDcarta } = req.params; // Obtiene el ID del usuario de los parámetros
  const { cantidad } = req.body; // Obtiene el nombre del cuerpo de la solicitud

  if (!IDcarta || !cantidad) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE mazo_cartas SET cantidad = ? WHERE IDmazo = ? and IDcarta = ?';
  
  db.query(query, [cantidad, mazoId, IDcarta], (err, result) => {
    if (err) {
      console.error('Error al actualizar la carta:', err);
      return res.status(500).json({ error: 'Error al actualizar la carta' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Carta no encontrada' });
    }

    res.status(200).json({ message: 'Carta actualizada exitosamente' });
  });
});

// DELETE: Elimina una carta específica de un mazo
app.delete('/api/eliminarmazocarta/:idmazo/:idcarta', (req, res) => {
  const { idmazo, idcarta } = req.params;

  if (!idmazo || !idcarta) {
    return res.status(400).json({ error: 'Faltan datos para eliminar la carta' });
  }

  const query = 'DELETE FROM mazo_cartas WHERE IDmazo = ? AND IDcarta = ?';
  
  db.query(query, [idmazo, idcarta], (err, result) => {
    if (err) {
      console.error('Error al eliminar la carta:', err);
      return res.status(500).json({ error: 'Error al eliminar la carta' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Carta no encontrada en el mazo' });
    }

    res.status(200).json({ message: 'Carta eliminada exitosamente' });
  });
});

app.put('/api/usuario/:id', (req, res) => {
  const userId = req.params.id; // Obtiene el ID del usuario de los parámetros
  const { nombre, imageNumber } = req.body; // Obtiene el nombre del cuerpo de la solicitud

  if (!nombre || !imageNumber) {
    return res.status(400).json({ error: 'datos incompletos' });
  }

  const query = 'UPDATE usuario SET nombre = ?, foto = ? WHERE idusuario = ?';
  
  db.query(query, [nombre, imageNumber, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
});

// POST: Agrega cartas favoritas
app.post('/api/cartasfavoritas', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { idusuario, idcarta } = req.body;

  if (!idusuario || !idcarta) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para verificar si la carta ya está en la lista de favoritas
  const checkQuery = 'SELECT * FROM cartas_favoritas WHERE IDusuario = ? AND IDcarta = ?';
  db.query(checkQuery, [idusuario, idcarta], (err, results) => {
    if (err) {
      console.error('Error al verificar carta:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al verificar carta' });
    }

    // Si la carta ya está en la lista de favoritas
    if (results.length > 0) {
      console.log('La carta ya está marcada como favorita'); // Mensaje en la consola
      return res.status(409).json({ error: 'La carta ya está marcada como favorita' });
    }

    // Si la carta no está en la lista de favoritas, procedemos a insertarla
    const insertQuery = 'INSERT INTO cartas_favoritas (IDusuario, IDcarta) VALUES (?, ?)';
    db.query(insertQuery, [idusuario, idcarta], (err, result) => {
      if (err) {
        console.error('Error al guardar carta:', err); // Mensaje de error
        return res.status(500).json({ error: 'Error al guardar carta' });
      }
      res.status(200).json({ message: 'Carta guardada exitosamente' });
    });
  });
});

// GET: Obtiene las cartas favoritas de un usuario
app.get('/api/cartasfavoritas/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario; // Obtiene el ID del usuario de los parámetros de la ruta

  // Verifica si el ID del usuario está presente
  if (!idusuario) {
    console.log('Falta el ID del usuario'); // Mensaje cuando falta el ID del usuario
    return res.status(400).json({ error: 'Falta el ID del usuario' });
  }

  // Consulta para obtener las cartas favoritas del usuario
  const selectQuery = 'SELECT * FROM cartas_favoritas WHERE IDusuario = ?';
  db.query(selectQuery, [idusuario], (err, results) => {
    if (err) {
      console.error('Error al obtener cartas favoritas:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al obtener cartas favoritas' });
    }

    // Si no hay cartas favoritas
    if (results.length === 0) {
      console.log('No se encontraron cartas favoritas'); // Mensaje en la consola
      return res.status(404).json({ message: 'No se encontraron cartas favoritas' });
    }

    // Respuesta exitosa con las cartas favoritas
    res.status(200).json(results); // Devuelve los resultados
  });
});

// DELETE: Elimina una carta favorita
app.delete('/api/cartasfavoritas', (req, res) => {
  console.log('Datos recibidos:', req.body); // Imprime los datos recibidos
  const { idusuario, idcarta } = req.body;

  if (!idusuario || !idcarta) {
    console.log('Faltan datos del formulario'); // Mensaje cuando faltan datos
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para eliminar la carta favorita
  const deleteQuery = 'DELETE FROM cartas_favoritas WHERE IDusuario = ? AND IDcarta = ?';
  db.query(deleteQuery, [idusuario, idcarta], (err, result) => {
    if (err) {
      console.error('Error al eliminar carta:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al eliminar carta' });
    }

    // Verificar si alguna fila fue afectada (es decir, si la carta existía y fue eliminada)
    if (result.affectedRows === 0) {
      console.log('La carta no se encontró en la lista de favoritas'); // Mensaje en la consola
      return res.status(404).json({ error: 'La carta no se encontró en la lista de favoritas' });
    }

    console.log('Carta eliminada exitosamente'); // Mensaje en la consola
    res.status(200).json({ message: 'Carta eliminada exitosamente' });
  });
});

// POST: Agrega cartas a ultimas_cartas_vistas
app.post('/api/ultimascartasvistas', (req, res) => {
  const { IDusuario, IDcarta } = req.body;

  // Validar que se han proporcionado IDusuario e IDcarta
  if (!IDusuario || !IDcarta) {
    console.log('Faltan datos del formulario');
    return res.status(400).json({ error: 'Faltan datos del formulario' });
  }

  // Consulta para contar cuántas cartas tiene el usuario
  const countQuery = 'SELECT COUNT(*) AS cartaCount FROM ultimas_cartas_vistas WHERE IDusuario = ?';
  db.query(countQuery, [IDusuario], (err, countResult) => {
    if (err) {
      console.error('Error al contar cartas:', err);
      return res.status(500).json({ error: 'Error al contar cartas' });
    }

    const cartaCount = countResult[0].cartaCount;

    // Si hay más de 4 cartas, elimina la carta más antigua (IDnumero = 5)
    if (cartaCount >= 5) {
      const deleteQuery = `
        DELETE FROM ultimas_cartas_vistas 
        WHERE IDusuario = ? 
        AND IDnumero = 5
      `;
      db.query(deleteQuery, [IDusuario], (err) => {
        if (err) {
          console.error('Error al eliminar la carta más antigua:', err);
          return res.status(500).json({ error: 'Error al eliminar la carta más antigua' });
        }

        console.log('Se eliminó la carta más antigua (IDnumero = 5)');
      });
    }

    // Reordenar los IDnumero para que el 1 pase a 2, el 2 a 3, etc.
    const reorderQuery = `
      SET @row_number = 1; 
      UPDATE ultimas_cartas_vistas 
      SET IDnumero = (@row_number := @row_number + 1) 
      WHERE IDusuario = ? 
      ORDER BY IDnumero
    `;
    
    db.query(reorderQuery, [IDusuario], (err) => {
      if (err) {
        console.error('Error al reordenar IDnumero:', err);
        return res.status(500).json({ error: 'Error al reordenar IDnumero' });
      }

      // Inserta la nueva carta con IDnumero = 1
      const insertQuery = `
        INSERT INTO ultimas_cartas_vistas (IDusuario, IDnumero, IDcarta) 
        VALUES (?, 1, ?)
      `;
      db.query(insertQuery, [IDusuario, IDcarta], (err) => {
        if (err) {
          console.error('Error al agregar nueva carta:', err);
          return res.status(500).json({ error: 'Error al agregar nueva carta' });
        }

        console.log('Nueva carta agregada y IDnumero reordenados exitosamente');
        res.status(200).json({ message: 'Nueva carta agregada y IDnumero reordenados' });
      });
    });
  });
});

// GET: Obtiene las cartas vistas por un usuario
app.get('/api/ultimascartasvistas/:IDusuario', (req, res) => {
  const { IDusuario } = req.params; // Obtiene el IDusuario de los parámetros de la URL

  // Validar que se ha proporcionado un IDusuario
  if (!IDusuario) {
    console.log('Falta el ID de usuario'); // Mensaje cuando falta el IDusuario
    return res.status(400).json({ error: 'Falta el ID de usuario' });
  }

  // Consulta para obtener las cartas vistas por el usuario
  const query = 'SELECT * FROM ultimas_cartas_vistas WHERE IDusuario = ? ORDER BY IDnumero DESC';
  db.query(query, [IDusuario], (err, results) => {
    if (err) {
      console.error('Error al obtener cartas vistas:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al obtener cartas vistas' });
    }

    // Verificar si se encontraron cartas
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron cartas vistas para este usuario' });
    }

    // Devolver las cartas vistas
    res.status(200).json(results);
  });
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});