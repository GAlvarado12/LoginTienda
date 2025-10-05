const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class UsuarioRol extends Model {}
UsuarioRol.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, { sequelize, modelName: 'UsuarioRol', tableName: 'usuarios_roles' });

module.exports = UsuarioRol;
