require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./src/config/db');
const { swaggerSpec } = require('./src/config/swagger');

const rutasAuth = require('./src/rutas/auth.rutas');
const rutasUsuarios = require('./src/rutas/usuarios.rutas');
const rutasRoles = require('./src/rutas/roles.rutas');
const rutasPermisos = require('./src/rutas/permisos.rutas');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { ok: false, mensaje: 'Demasiadas solicitudes, inténtelo más tarde.' }
}));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: { persistAuthorization: true },
}));

app.use('/api/autenticacion', rutasAuth);
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/roles', rutasRoles);
app.use('/api/permisos', rutasPermisos);

app.use((err, req, res, next) => {
  console.error('❌ Error capturado:', err);
  const estado = err.estado || 500;
  res.status(estado).json({
    ok: false,
    mensaje: err.mensaje || 'Error interno del servidor',
    detalles: err.detalles || err.message || undefined,
  });
});

const PUERTO = process.env.PUERTO || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida con la base de datos');
    await sequelize.sync();
    app.listen(PUERTO, () => {
      console.log(`🚀 Servidor ejecutándose en: http://localhost:${PUERTO}`);
      console.log(`📘 Swagger: http://localhost:${PUERTO}/api/docs`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
})();
