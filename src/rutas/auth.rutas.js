const express = require('express');
const ctrl = require('../controladores/auth.controlador');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Registro, ingreso, tokens y cierre de sesión
 */

/**
 * @swagger
 * /api/autenticacion/registro:
 *   post:
 *     summary: Registro local de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [correo_electronico, clave, nombres, apellidos]
 *             properties:
 *               correo_electronico: { type: string, example: "valeria.montenegro@tiendaropa.com" }
 *               clave: { type: string, example: "Valeria@2025" }
 *               nombres: { type: string, example: "Valeria" }
 *               apellidos: { type: string, example: "Montenegro" }
 *     responses:
 *       201: { description: Registrado }
 *       409: { description: Correo ya registrado }
 */
router.post('/registro', ctrl.registrar);

/**
 * @swagger
 * /api/autenticacion/ingreso:
 *   post:
 *     summary: Ingreso local (email/clave)
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [correo_electronico, clave]
 *             properties:
 *               correo_electronico: { type: string, example: "admin@tiendaropa.com" }
 *               clave: { type: string, example: "AdminRopa2025*" }
 *     responses:
 *       200: { description: Tokens emitidos }
 *       401: { description: Credenciales inválidas }
 */
router.post('/ingreso', ctrl.login);

/**
 * @swagger
 * /api/autenticacion/renovar:
 *   post:
 *     summary: Renovar tokens con refreshToken
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken: { type: string, example: "..." }
 *     responses:
 *       501: { description: No implementado en esta versión compacta }
 */
router.post('/renovar', ctrl.renovar);

/**
 * @swagger
 * /api/autenticacion/salida:
 *   post:
 *     summary: Cerrar sesión (revoca refreshToken)
 *     tags: [Autenticación]
 *     requestBody:
 *       required: false
 *     responses:
 *       200: { description: Sesión cerrada (demo) }
 */
router.post('/salida', ctrl.cerrarSesion);

/**
 * @swagger
 * /api/autenticacion/google:
 *   post:
 *     summary: Ingreso con Google (enviar id_token del cliente)
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_token: { type: string, example: "eyJhbGciOi..." }
 *     responses:
 *       501: { description: Pendiente de configuración de Google CLIENT_ID }
 */
router.post('/google', ctrl.loginGoogle);

module.exports = router;
