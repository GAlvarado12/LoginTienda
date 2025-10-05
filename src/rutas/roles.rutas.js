const express = require('express');
const ctrl = require('../controladores/roles.controlador');
const autenticar = require('../middlewares/autenticarJWT');
const autorizar = require('../middlewares/autorizarPermiso');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Gestión de roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear rol
 *     tags: [Roles]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre: { type: string, example: "ADMINISTRADOR" }
 *               descripcion: { type: string, example: "Acceso total al sistema" }
 *     responses:
 *       201: { description: Rol creado }
 */
router.post('/', autenticar, autorizar(['ROLES_CREAR']), ctrl.crear);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar roles
 *     tags: [Roles]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: Lista de roles }
 */
router.get('/', autenticar, autorizar(['ROLES_VER']), ctrl.listar);

/**
 * @swagger
 * /api/roles/{id}/permisos:
 *   post:
 *     summary: Reemplazar permisos de un rol
 *     tags: [Roles]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [permisos_ids]
 *             properties:
 *               permisos_ids:
 *                 type: array
 *                 items: { type: integer }
 *                 example: [1,2,3]
 *     responses:
 *       200: { description: Permisos asignados }
 */
router.post('/:id/permisos', autenticar, autorizar(['ROLES_PERMISOS_GESTIONAR']), ctrl.asignarPermisos);

module.exports = router;
