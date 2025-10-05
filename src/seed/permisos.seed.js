require('dotenv').config();
const { sequelize } = require('../config/db');
const { Permiso } = require('../modelos');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const lista = [
      'USUARIOS_VER','USUARIOS_EDITAR','USUARIOS_ELIMINAR',
      'ROLES_CREAR','ROLES_VER','ROLES_PERMISOS_GESTIONAR','ROLES_ASIGNAR',
      'PERMISOS_CREAR','PERMISOS_VER'
    ];
    for (const nombre of lista) {
      await Permiso.findOrCreate({ where: { nombre }, defaults: { nombre, descripcion: nombre } });
      console.log(`✅ Permiso listo: ${nombre}`);
    }
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed permisos:', e.message);
    process.exit(1);
  }
})();
