const express = require("express");
const router = express.Router();

const upload = require("../config/upload");
const mainController = require("../controllers/mainController");
const autenticacao = require("../config/autenticacao");
const autorizar = require("../config/autorizacao");

//login e logout
router.get("/login", mainController.telaLogin);
router.post("/login", mainController.login);

//eleitor
// Admin e técnico mantêm eleitores
router.get("/cadastroEleitores", autorizar("admin", "tecnico"), mainController.abreCadastroEleitores);
router.post("/cadastroEleitores", autorizar("admin", "tecnico"), mainController.salvaCadastroEleitores);

router.get("/gerenciarEleitor", autorizar("admin", "tecnico"), mainController.tela_gerenciar_eleitor);
router.post("/eleitor/excluir/:id", autorizar("admin", "tecnico"), mainController.excluirEleitor);
router.post("/eleitor/inativar/:id", autorizar("admin", "tecnico"), mainController.inativarEleitor);
router.post("/eleitor/ativar/:id", autorizar("admin", "tecnico"), mainController.ativarEleitor);

// Todos autenticados podem visualizar perfil
router.get("/perfil/:id", autorizar("admin", "eleitor", "tecnico"), mainController.visualizarPerfil);

// Eleitor, técnico e admin podem solicitar atualização
router.get("/solicitarAtualizacao", autorizar("admin", "eleitor", "tecnico"), mainController.abreSolicitacao);
router.post("/enviarAtualizacao", autorizar("admin", "eleitor", "tecnico"), mainController.solicitarAtualizacao);

// Atualização de dados
router.get("/atualizarDados/:id", autorizar("admin", "tecnico"), mainController.abreAtualizacao);
router.post("/atualizarDados/:id", autorizar("admin", "tecnico"), mainController.atualizaDados);

//partidos
router.get("/cadastroPartido", autorizar("admin"), mainController.abreCadastroPartido);
router.post("/cadastroPartido", autorizar("admin"), mainController.salvaCadastroPartido);

router.get("/gerenciarPartido", autorizar("admin"), mainController.tela_gerenciar_partido);
router.post("/partido/excluir/:id", autorizar("admin"), mainController.excluirPartido);
router.get("/partido/editar/:id", autorizar("admin"), mainController.editarPartido);
router.post("/partido/atualizar/:id", autorizar("admin"), mainController.atualizarPartido);

// candidatos
router.get("/cadastroCandidato", autorizar("admin", "tecnico"), mainController.abreCadastroCandidato);
router.post("/cadastroCandidato", autorizar("admin", "tecnico"), mainController.salvaCadastroCandidato);

router.get("/gerenciarCandidato", autorizar("admin", "tecnico"), mainController.tela_gerenciar_candidato);
router.post("/candidato/inativar/:id", autorizar("admin", "tecnico"), mainController.inativarCandidato);
router.post("/candidato/ativar/:id", autorizar("admin", "tecnico"), mainController.ativarCandidato);
router.post("/candidato/excluir/:id", autorizar("admin", "tecnico"), mainController.excluirCandidato);
router.get("/candidato/editar/:id", autorizar("admin", "tecnico"), mainController.tela_atualizar_candidato);
router.post("/candidato/atualizar/:id", autorizar("admin", "tecnico"), mainController.atualizarCandidato);

// zona eleitoral
router.get("/cadastroZonaEleitoral", autorizar("admin"), mainController.tela_cadastro_zona_eleitoral);
router.post("/cadastroZonaEleitoral", autorizar("admin"), mainController.salvaCadastroZonaEleitoral);

router.get("/gerenciarZonaEleitoral", autorizar("admin"), mainController.tela_gerenciar_zona_eleitoral);
router.post("/zona-eleitoral/excluir/:id", autorizar("admin"), mainController.excluirZonaEleitoral);
router.get("/zona-eleitoral/editar/:id", autorizar("admin"), mainController.tela_atualizar_zona_eleitoral);
router.post("/zona-eleitoral/atualizar/:id", autorizar("admin"), mainController.atualizarZonaEleitoral);

//seção eleitoral
router.get("/cadastroSecaoEleitoral", autorizar("admin"), mainController.tela_cadastro_secao_eleitoral);
router.post("/cadastroSecaoEleitoral", autorizar("admin"), mainController.salvaCadastroSecao);

router.get("/gerenciarSecaoEleitoral", autorizar("admin"), mainController.tela_gerenciar_secao_eleitoral);
router.post("/secao-eleitoral/excluir/:id", autorizar("admin"), mainController.excluirSecaoEleitoral);
router.get("/secao-eleitoral/editar/:id", autorizar("admin"), mainController.tela_atualizar_secao_eleitoral);
router.post("/secao-eleitoral/atualizar/:id", autorizar("admin"), mainController.atualizarSecaoEleitoral);
router.get("/secaoEleitoral", autorizar("admin"), mainController.tela_cadastro_secao_eleitoral);

//urnas
router.get("/cadastroUrnas", autorizar("admin"), mainController.abreCadastroUrnas);
router.post("/cadastroUrnas", autorizar("admin"), mainController.salvaCadastroUrnas);
router.post("/urna/inativar/:id", autorizar("admin"), mainController.inativarUrna);
router.post("/urna/ativar/:id", autorizar("admin"), mainController.ativarUrna);
router.post("/urna/excluir/:id", autorizar("admin"), mainController.excluirUrna);

//votação
router.get("/urnaEletronica", autorizar("admin", "eleitor", "tecnico"), mainController.urnaEletronica);
router.post("/votar", autorizar("admin", "eleitor", "tecnico"), mainController.votar);

router.get("/homeEleitor", autorizar("admin", "eleitor", "tecnico"), mainController.homeEleitor);

//relatórios
router.get("/gerar-relatorio", autorizar("admin"), mainController.gerarRelatorio);
router.post("/gerar-relatorio", autorizar("admin"), mainController.gerarRelatorio);

//chapa
router.get("/cadastroChapa", autorizar("admin"), mainController.abreCadastroChapa);
router.post("/cadastroChapa", autorizar("admin"), mainController.salvaCadastroChapa);
router.get("/gerenciarChapas", autorizar("admin"), mainController.tela_gerenciar_chapa);
router.post("/chapa/excluir/:id", autorizar("admin"), mainController.excluirChapa);

//resultado e comprovante
router.get("/resultadoEleicao", autorizar("admin", "eleitor", "tecnico"), mainController.abreResultadoEleicao);
router.get("/comprovante", autorizar("admin", "eleitor", "tecnico"), mainController.abreComprovante);

module.exports = router;