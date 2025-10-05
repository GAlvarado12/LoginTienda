require('dotenv').config();
const { sequelize } = require('../config/db');
const { Rol } = require('../modelos');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const base = [
      { nombre: 'ADMINISTRADOR', descripcion: 'Acceso total al sistema' },
      { nombre: 'EMPLEADO', descripcion: 'Gestiona inventario y ventas' },
      { nombre: 'CLIENTE', descripcion: 'Rol base asignado al registrarse' }
    ];
    for (const r of base) {
      await Rol.findOrCreate({ where: { nombre: r.nombre }, defaults: r });
      console.log(`✅ Rol listo: ${r.nombre}`);
    }
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed roles:', e.message);
    process.exit(1);
  }
})();
