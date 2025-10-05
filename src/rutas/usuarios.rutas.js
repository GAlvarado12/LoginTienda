const express = require('express');
const ctrl = require('../controladores/usuarios.controlador');
const autenticar = require('../middlewares/autenticarJWT');
const autorizar = require('../middlewares/autorizarPermiso');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios, estado y roles
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Usuarios]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: OK }
 */
router.get('/', autenticar, autorizar(['USUARIOS_VER']), ctrl.listar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Detalle de usuario
 *     tags: [Usuarios]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 */
router.get('/:id', autenticar, autorizar(['USUARIOS_VER']), ctrl.detalle);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres: { type: string, example: "Nombre Editado" }
 *               apellidos: { type: string, example: "Apellido Editado" }
 *               estado: { type: string, enum: [ACTIVO, INACTIVO], example: ACTIVO }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 */
router.patch('/:id', autenticar, autorizar(['USUARIOS_EDITAR']), ctrl.actualizar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario (borrado lógico)
 *     tags: [Usuarios]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/:id', autenticar, autorizar(['USUARIOS_ELIMINAR']), ctrl.eliminar);

/**
 * @swagger
 * /api/usuarios/{id}/asignar-rol:
 *   post:
 *     summary: Asignar rol a usuario
 *     tags: [Usuarios]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rol_id]
 *             properties:
 *               rol_id: { type: integer, example: 1 }
 *     responses:
 *       200: { description: Rol asignado }
 *       404: { description: Usuario o rol inexistente }
 */
router.post('/:id/asignar-rol', autenticar, autorizar(['ROLES_ASIGNAR']), ctrl.asignarRol);

module.exports = router;
