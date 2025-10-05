const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Permiso extends Model {}
Permiso.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(80), unique: true, allowNull: false },
  descripcion: { type: DataTypes.STRING(200) }
}, { sequelize, modelName: 'Permiso', tableName: 'permisos' });

module.exports = Permiso;
