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

  const query = 'INSERT INTO usuario (nombre, correo, clave) VALUES (?, ?, ?)';
  db.query(query, [nombre, correo, clave], (err, result) => {
    if (err) {
      console.error('Error al registrar el usuario:', err); // Mensaje de error
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
});

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


// GET: /api/mazocartas/:IDcarta/:IDmazo
app.get('/api/mazocartas/:IDcarta/:IDmazo', async (req, res) => {
  const { IDcarta, IDmazo, cantidad } = req.params;

  const query = `SELECT * FROM mazo_cartas WHERE IDmazo = ?`;

  try {
    const [rows] = await db.execute(query, [IDcarta, IDmazo, cantidad]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'No se encontr� la carta en el mazo' });
    }
  } catch (error) {
    console.error('Error al obtener la carta del mazo:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
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

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});