const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const criarUsuariosPadrao = require("./config/criarUsuariosPadrao");
const mainRouter = require("./router/mainRouters");

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

app.use("/", mainRouter);

criarUsuariosPadrao().then(() => {
  app.listen(port, function () {
    console.log("Servidor funcionando na porta: " + port);
  });
});