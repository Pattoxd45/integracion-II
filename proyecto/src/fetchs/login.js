const handleLogin = async () => {
    try {
      const response = await fetch('http://186.64.122.218:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      console.log('Respuesta del servidor:', result);
      console.log('Código de respuesta:', response.status);
  
      if (response.ok) {
        Alert.alert('Login exitoso', 'Sesión iniciada correctamente');
        console.log('ID de usuario:', result.userId);
        const Id = result.userId;
        console.log("almacenando en contexto... ", Id);
        setUserId(Id);
        // Redirige a la pantalla principal
        navigation.replace('Main');
      } else {
        Alert.alert('Error de login', result.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
      console.error('Error en el fetch:', error);
    }
  };