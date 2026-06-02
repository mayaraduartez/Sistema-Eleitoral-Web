const Eleitor = require("../models/Eleitor.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const usuario = await Eleitor.findOne({
        where: {
          email: username,
          senha: password
        }
      });

      if (!usuario) {
        return cb(null, false, { msg: "Email ou senha inválidos!" });
      }

      return cb(null, usuario);
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, {
    id: user.id,
    email: user.email,
    nome: user.nome,
    perfil: user.perfil || "eleitor"
  });
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

module.exports = passport;