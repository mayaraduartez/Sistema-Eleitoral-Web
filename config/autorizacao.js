module.exports = function (...perfisPermitidos) {
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }

    const perfil = req.user.perfil;

    if (perfisPermitidos.includes(perfil)) {
      return next();
    }

    return res.status(403).send("Acesso negado. Você não tem permissão para acessar esta página.");
  };
};