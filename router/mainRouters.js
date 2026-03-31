const express = require("express");
const router = express.Router();
//const loginController = require("../controllers/loginController");
//const autenticacao = require("../config/autenticacao");
const upload = require("../config/upload");
const mainController = require("../controllers/mainController");


router.get("/cadastroEleitores", mainController.abreCadastroEleitores);

router.post("/cadastroEleitores", mainController.salvaCadastroEleitores);



// Excluir ou inativar o eleitor
router.get("/gerenciarEleitor", mainController.tela_gerenciar_eleitor);
router.post("/eleitor/excluir/:id", mainController.excluirEleitor);
router.post("/eleitor/inativar/:id", mainController.inativarEleitor);
router.post("/eleitor/ativar/:id", mainController.ativarEleitor);
module.exports = router;