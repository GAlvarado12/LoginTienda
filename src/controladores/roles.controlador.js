const Joi = require('joi');
const { Rol, Permiso } = require('../modelos');

exports.crear = async (req, res, next) => {
  try {
    const esquema = Joi.object({ nombre: Joi.string().required(), descripcion: Joi.string().allow('') });
    const datos = await esquema.validateAsync(req.body);
    const rol = await Rol.create(datos);
    res.status(201).json({ ok:true, datos: rol });
  } catch (e) { next(e); }
};

exports.listar = async (req, res, next) => {
  try {
    const roles = await Rol.findAll({ include: Permiso });
    res.json({ ok:true, datos: roles });
  } catch (e) { next(e); }
};

exports.asignarPermisos = async (req, res, next) => {
  try {
    const esquema = Joi.object({ permisos_ids: Joi.array().items(Joi.number()).required() });
    const { permisos_ids } = await esquema.validateAsync(req.body);
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ ok:false, mensaje:'Rol no encontrado' });
    const permisos = await Permiso.findAll({ where: { id: permisos_ids } });
    await rol.setPermisos(permisos);
    res.json({ ok:true, mensaje:'Permisos asignados' });
  } catch (e) { next(e); }
};
