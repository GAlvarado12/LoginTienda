const Joi = require('joi');
const { Permiso } = require('../modelos');

exports.crear = async (req, res, next) => {
  try {
    const esquema = Joi.object({ nombre: Joi.string().required(), descripcion: Joi.string().allow('') });
    const datos = await esquema.validateAsync(req.body);
    const permiso = await Permiso.create(datos);
    res.status(201).json({ ok:true, datos: permiso });
  } catch (e) { next(e); }
};

exports.listar = async (req, res, next) => {
  try {
    const permisos = await Permiso.findAll();
    res.json({ ok:true, datos: permisos });
  } catch (e) { next(e); }
};
