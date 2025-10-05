const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Usuario extends Model {}
Usuario.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  correo_electronico: { type: DataTypes.STRING(160), unique: true, allowNull: false, validate: { isEmail: true } },
  clave_hash: { type: DataTypes.STRING, allowNull: true },
  nombres: { type: DataTypes.STRING(120), allowNull: false },
  apellidos: { type: DataTypes.STRING(120), allowNull: false },
  estado: { type: DataTypes.ENUM('ACTIVO','INACTIVO'), defaultValue: 'ACTIVO' },
  proveedor: { type: DataTypes.ENUM('LOCAL','GOOGLE'), defaultValue: 'LOCAL' }
}, { sequelize, modelName: 'Usuario', tableName: 'usuarios' });

module.exports = Usuario;
