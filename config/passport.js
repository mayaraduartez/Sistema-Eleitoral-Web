const Eleitor = require("../models/Eleitor.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const usuario = await Eleitor.findOne({ where: { email: username } });

      if (!usuario) {
        return cb(null, false, { msg: "Usuário não existe!" });
      }

      if (!bcrypt.compareSync(password, usuario.senha)) {
        return cb(null, false, { msg: "Senha incorreta!" });
      }

      return cb(null, usuario);
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user.id,
      email: user.email,
      nome: user.nome,
      perfil: user.perfil || "eleitor"
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;