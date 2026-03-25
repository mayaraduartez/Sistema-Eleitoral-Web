const express = require("express");
const router = express.Router();
//const loginController = require("../controllers/loginController");
//const autenticacao = require("../config/autenticacao");
const upload = require("../config/upload");
const mainController = require("../controllers/mainController");


router.get("/cadastroEleitores", mainController.abreCadastroEleitores);

router.post("/cadastroEleitores", mainController.salvaCadastroEleitores);



module.exports = router;