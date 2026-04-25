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

// Rotas de gerenciamento de partido
router.get("/gerenciarPartido", mainController.tela_gerenciar_partido);
router.post("/partido/excluir/:id", mainController.excluirPartido);
router.get("/partido/editar/:id", mainController.editarPartido);
router.post("/partido/atualizar/:id", mainController.atualizarPartido);


// Rotas de gerenciamento de Candidato
router.get("/cadastroCandidato", mainController.abreCadastroCandidato);
router.post("/cadastroCandidato", mainController.salvaCadastroCandidato);
router.get("/gerenciarCandidato", mainController.tela_gerenciar_candidato);
router.post('/candidato/inativar/:id', mainController.inativarCandidato);
router.post('/candidato/ativar/:id', mainController.ativarCandidato);
router.post('/candidato/excluir/:id', mainController.excluirCandidato);
router.get('/candidato/editar/:id', mainController.tela_atualizar_candidato);
router.post('/candidato/atualizar/:id', mainController.atualizarCandidato);

// Rotas de gerenciamento de Zona Eleitoral
router.get("/cadastroZonaEleitoral", mainController.tela_cadastro_zona_eleitoral);
router.post("/cadastroZonaEleitoral", mainController.salvaCadastroZonaEleitoral);
router.get("/gerenciarZonaEleitoral", mainController.tela_gerenciar_zona_eleitoral);
router.post('/zona-eleitoral/excluir/:id', mainController.excluirZonaEleitoral);
router.get('/zona-eleitoral/editar/:id', mainController.tela_atualizar_zona_eleitoral);
router.post('/zona-eleitoral/atualizar/:id', mainController.atualizarZonaEleitoral);

module.exports = router;
