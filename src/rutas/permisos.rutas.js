const express = require('express');
const ctrl = require('../controladores/permisos.controlador');
const autenticar = require('../middlewares/autenticarJWT');
const autorizar = require('../middlewares/autorizarPermiso');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Permisos
 *     description: Control de permisos del sistema
 */

/**
 * @swagger
 * /api/permisos:
 *   post:
 *     summary: Crear permiso
 *     tags: [Permisos]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre: { type: string, example: "USUARIOS_VER" }
 *               descripcion: { type: string, example: "Permite ver usuarios" }
 *     responses:
 *       201: { description: Permiso creado }
 */
router.post('/', autenticar, autorizar(['PERMISOS_CREAR']), ctrl.crear);

/**
 * @swagger
 * /api/permisos:
 *   get:
 *     summary: Listar permisos
 *     tags: [Permisos]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: Lista de permisos }
 */
router.get('/', autenticar, autorizar(['PERMISOS_VER']), ctrl.listar);

module.exports = router;
