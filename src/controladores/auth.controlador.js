const servicio = require('../servicios/auth.servicio');

exports.registrar = async (req, res, next) => {
  try {
    const usuario = await servicio.registrar(req.body);
    res.status(201).json({ ok:true, mensaje:'Registrado', datos: { id: usuario.id, correo: usuario.correo_electronico } });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await servicio.login(req.body);
    res.json({ ok:true, accessToken, refreshToken });
  } catch (e) { next(e); }
};

exports.renovar = async (req, res) => {
  res.status(501).json({ ok:false, mensaje:'Renovación de token no implementada en esta versión compacta.' });
};

exports.cerrarSesion = async (req, res) => {
  res.json({ ok:true, mensaje:'Sesión cerrada (demo)' });
};

exports.loginGoogle = async (req, res) => {
  res.status(501).json({ ok:false, mensaje:'Login con Google pendiente de configuración del CLIENT_ID.' });
};
