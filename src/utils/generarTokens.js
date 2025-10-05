const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const crearAccessToken = (usuario) => {
  const payload = { sub: usuario.id, correo: usuario.correo_electronico };
  return jwt.sign(payload, process.env.JWT_SECRETO, { expiresIn: `${process.env.JWT_EXP_MINUTOS || 15}m` });
};

const crearRefreshToken = () => uuidv4() + uuidv4();

module.exports = { crearAccessToken, crearRefreshToken };
