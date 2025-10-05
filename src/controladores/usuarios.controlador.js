const Joi = require('joi');
const { Usuario, Rol } = require('../modelos');

exports.listar = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({ include: { model: Rol } });
    res.json({ ok:true, datos: usuarios });
  } catch (e) { next(e); }
};

exports.detalle = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { include: { model: Rol } });
    if (!usuario) return res.status(404).json({ ok:false, mensaje:'No encontrado' });
    res.json({ ok:true, datos: usuario });
  } catch (e) { next(e); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const esquema = Joi.object({
      nombres: Joi.string(),
      apellidos: Joi.string(),
      estado: Joi.string().valid('ACTIVO','INACTIVO')
    });
    const datos = await esquema.validateAsync(req.body);
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ ok:false, mensaje:'No encontrado' });
    await usuario.update(datos);
    res.json({ ok:true, datos: usuario });
  } catch (e) { next(e); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ ok:false, mensaje:'No encontrado' });
    await usuario.destroy();
    res.json({ ok:true, mensaje:'Eliminado' });
  } catch (e) { next(e); }
};

exports.asignarRol = async (req, res, next) => {
  try {
    const esquema = Joi.object({ rol_id: Joi.number().required() });
    const { rol_id } = await esquema.validateAsync(req.body);
    const usuario = await Usuario.findByPk(req.params.id);
    const rol = await Rol.findByPk(rol_id);
    if (!usuario || !rol) return res.status(404).json({ ok:false, mensaje:'Usuario o rol inexistente' });
    await usuario.addRol(rol);
    res.json({ ok:true, mensaje:'Rol asignado' });
  } catch (e) { next(e); }
};
