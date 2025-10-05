const Usuario = require('./Usuario');
const Rol = require('./Rol');
const Permiso = require('./Permiso');
const UsuarioRol = require('./UsuarioRol');
const RolPermiso = require('./RolPermiso');

Usuario.belongsToMany(Rol, { through: UsuarioRol, foreignKey: 'usuario_id' });
Rol.belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'rol_id' });

Rol.belongsToMany(Permiso, { through: RolPermiso, foreignKey: 'rol_id' });
Permiso.belongsToMany(Rol, { through: RolPermiso, foreignKey: 'permiso_id' });

module.exports = { Usuario, Rol, Permiso, UsuarioRol, RolPermiso };
