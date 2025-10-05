const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida. Coloca tu URL de Neon en el .env');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false,
  define: { freezeTableName: true, underscored: true, paranoid: true }
});

module.exports = { sequelize };
