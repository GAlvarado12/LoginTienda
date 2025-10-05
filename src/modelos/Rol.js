const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Rol extends Model {}
Rol.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(60), unique: true, allowNull: false },
  descripcion: { type: DataTypes.STRING(200), allowNull: true }
}, { sequelize, modelName: 'Rol', tableName: 'roles' });

module.exports = Rol;
