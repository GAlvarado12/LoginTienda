require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db');
const { Usuario, Rol, Permiso } = require('../modelos');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const [adminRol] = await Rol.findOrCreate({ where: { nombre: 'ADMINISTRADOR' }, defaults: { descripcion: 'Acceso total al sistema' } });
    const permisosNombres = [
      'USUARIOS_VER','USUARIOS_EDITAR','USUARIOS_ELIMINAR',
      'ROLES_CREAR','ROLES_VER','ROLES_PERMISOS_GESTIONAR','ROLES_ASIGNAR',
      'PERMISOS_CREAR','PERMISOS_VER'
    ];
    const permisos = [];
    for (const n of permisosNombres) {
      const [p] = await Permiso.findOrCreate({ where: { nombre: n }, defaults: { descripcion: n } });
      permisos.push(p);
    }
    await adminRol.setPermisos(permisos);

    const correo = 'admin@tiendaropa.com';
    let admin = await Usuario.findOne({ where: { correo_electronico: correo } });
    if (!admin) {
      admin = await Usuario.create({
        nombres: 'Administrador',
        apellidos: 'Principal',
        correo_electronico: correo,
        clave_hash: await bcrypt.hash('AdminRopa2025*', 10),
        proveedor: 'LOCAL'
      });
      await admin.addRol(adminRol);
      console.log('✅ Usuario admin: admin@tiendaropa.com / AdminRopa2025*');
    } else {
      await admin.addRol(adminRol);
      console.log('ℹ️ Usuario admin ya existía; rol sincronizado.');
    }

    console.log('🎉 Seed admin completado.');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed admin:', e.message);
    process.exit(1);
  }
})();
