const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class RolPermiso extends Model {}
RolPermiso.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, { sequelize, modelName: 'RolPermiso', tableName: 'roles_permisos' });

module.exports = RolPermiso;
