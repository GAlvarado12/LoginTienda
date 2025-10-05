const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../modelos');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ ok:false, mensaje: 'Token no proporcionado' });

    const payload = jwt.verify(token, process.env.JWT_SECRETO);
    const usuario = await Usuario.findByPk(payload.sub, { include: [{ model: Rol, through: { attributes: [] } }] });
    if (!usuario || usuario.estado !== 'ACTIVO') return res.status(401).json({ ok:false, mensaje: 'Usuario no autorizado' });
    req.usuario = usuario;
    next();
  } catch (e) {
    return res.status(401).json({ ok:false, mensaje: 'Token inválido o expirado' });
  }
};
