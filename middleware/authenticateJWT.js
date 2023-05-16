function authenticateJWT(req, res, next) {
  // Obtén el token del encabezado 'Authorization' de la petición
  const authHeader = req.headers.authorization;

  // Comprueba si el encabezado existe
  if (authHeader) {
    // El formato del encabezado debe ser 'Bearer TOKEN'
    // Así que divide el encabezado por un espacio para obtener el token
    const token = authHeader.split(' ')[1];

    // Utiliza jsonwebtoken para verificar el token
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
      // Si la verificación falla, jsonwebtoken llama al callback con un error
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Si la verificación es exitosa, jsonwebtoken llama al callback con el token decodificado
      // Guarda este objeto decodificado en la petición para su uso en los siguientes middlewares o rutas
      req.user = decoded;
      next();
    });
  } else {
    // Si no hay un encabezado 'Authorization', envía un error de 'No autorizado'
    res.status(401).json({ message: "Unauthorized" });
  }
}
