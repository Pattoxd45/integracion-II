const handleRegister = () => {
    // Aquí colocas la lógica para enviar los datos al servidor
    if (!username || !email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Construimos el objeto con los datos del usuario
    const userData = {
      nombre: username,  // nombre en lugar de username para coincidir con el backend
      correo: email,
      clave: password  // clave en lugar de password
    };

    // Hacemos la solicitud POST al servidor
    fetch('http://186.64.122.218:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        Alert.alert('Error en el registro', data.error);
      } else {
        Alert.alert('Registro exitoso', '¡Bienvenido a la plataforma!');
        navigation.replace('Login');  // Redirige al login después del registro exitoso
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema con el registro. Inténtalo de nuevo.');
    });
  };