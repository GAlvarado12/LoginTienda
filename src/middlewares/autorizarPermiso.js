module.exports = (permisosRequeridos = []) => {
  return async (req, res, next) => {
    try {
      const roles = await req.usuario.getRols();
      const permisosUsuario = new Set();

      for (const rol of roles) {
        const permisos = await rol.getPermisos();
        for (const p of permisos) permisosUsuario.add(p.nombre);
      }

      const autorizado = permisosRequeridos.every(p => permisosUsuario.has(p));
      if (!autorizado) return res.status(403).json({ ok:false, mensaje:'No posee permisos necesarios' });
      next();
    } catch (e) {
      next(e);
    }
  };
};
