const bcrypt = require('bcrypt');
const Joi = require('joi');
const { Usuario, Rol } = require('../modelos');
const { crearAccessToken, crearRefreshToken } = require('../utils/generarTokens');

const registrar = async (datos) => {
  const esquema = Joi.object({
    correo_electronico: Joi.string().email().required(),
    clave: Joi.string().min(8).required(),
    nombres: Joi.string().required(),
    apellidos: Joi.string().required()
  });
  const { correo_electronico, clave, nombres, apellidos } = await esquema.validateAsync(datos);

  const existe = await Usuario.findOne({ where: { correo_electronico } });
  if (existe) throw { estado: 409, mensaje: 'El correo ya está registrado' };

  const hash = await bcrypt.hash(clave, 10);
  const usuario = await Usuario.create({ correo_electronico, clave_hash: hash, nombres, apellidos, proveedor: 'LOCAL' });

  const rolBase = await Rol.findOne({ where: { nombre: 'CLIENTE' } });
  if (rolBase) await usuario.addRol(rolBase);

  return usuario;
};

const login = async (datos) => {
  const esquema = Joi.object({
    correo_electronico: Joi.string().email().required(),
    clave: Joi.string().required()
  });
  const { correo_electronico, clave } = await esquema.validateAsync(datos);

  const usuario = await Usuario.findOne({ where: { correo_electronico } });
  if (!usuario) throw { estado: 401, mensaje: 'Credenciales inválidas' };
  const ok = await require('bcrypt').compare(clave, usuario.clave_hash || '');
  if (!ok) throw { estado: 401, mensaje: 'Credenciales inválidas' };

  return {
    accessToken: crearAccessToken(usuario),
    refreshToken: crearRefreshToken()
  };
};

module.exports = { registrar, login };
