const express = require("express");
const router = express.Router();
//const loginController = require("../controllers/loginController");
//const autenticacao = require("../config/autenticacao");
const upload = require("../config/upload");
const mainController = require("../controllers/mainController");

// Rotas de Cadastro
router.get("/cadastroEleitores", mainController.abreCadastroEleitores);
router.post("/cadastroEleitores", mainController.salvaCadastroEleitores);

router.get("/perfil/:id", mainController.visualizarPerfil);

// Excluir ou inativar o eleitor
router.get("/gerenciarEleitor", mainController.tela_gerenciar_eleitor);
router.post("/eleitor/excluir/:id", mainController.excluirEleitor);
router.post("/eleitor/inativar/:id", mainController.inativarEleitor);
router.post("/eleitor/ativar/:id", mainController.ativarEleitor);

//Solicitar atualização de dados
router.get("/solicitarAtualizacao", mainController.abreSolicitacao);
router.post("/enviarAtualizacao", mainController.solicitarAtualizacao);

//Atualizar os dados do eleitor
router.get("/atualizarDados/:id", mainController.abreAtualizacao);
router.post("/atualizarDados/:id", mainController.atualizaDados);

//Rota do cadastro de partido
router.get("/cadastroPartido", mainController.abreCadastroPartido);
router.post("/cadastroPartido", mainController.salvaCadastroPartido);

module.exports = router;
