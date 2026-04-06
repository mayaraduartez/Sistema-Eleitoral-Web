const Candidato = require("../models/Candidato");
const Eleitor = require("../models/Eleitor");
const Partido = require("../models/Partido");
const Cargo = require("../models/Cargo"); // import do model

module.exports = {
  async abreCadastroCandidato(req, res) {
    try {
      const eleitores = await Eleitor.findAll({
        where: { status: "ativo" },
      });

      const partidos = await Partido.findAll();

      const cargos = await Cargo.findAll(); // busca todos os cargos

      res.render("cadastroCandidato", {
        eleitores,
        partidos,
        cargos, // envia para a view
        mensagem: null,
        erro: null,
      });
    } catch (error) {
      console.log(error);
      res.send("Erro ao abrir cadastro de candidato.");
    }
  },

  async salvaCadastroCandidato(req, res) {
    try {
      const { eleitorId, numeroCandidato, partidoId, cargoDisputado } = req.body;

      const eleitores = await Eleitor.findAll({
        where: { status: "ativo" },
      });

      const partidos = await Partido.findAll();
      const cargos = await Cargo.findAll(); // envia cargos também em caso de erro

      const numeroExistente = await Candidato.findOne({
        where: { numeroCandidato: numeroCandidato },
      });

      if (numeroExistente) {
        return res.render("cadastroCandidato", {
          eleitores,
          partidos,
          cargos,
          mensagem: null,
          erro: "Número de candidato já cadastrado.",
        });
      }

      const eleitorJaCandidato = await Candidato.findOne({
        where: { eleitorId: eleitorId },
      });

      if (eleitorJaCandidato) {
        return res.render("cadastroCandidato", {
          eleitores,
          partidos,
          cargos,
          mensagem: null,
          erro: "Este eleitor já foi cadastrado como candidato.",
        });
      }

      await Candidato.create({
        eleitorId,
        numeroCandidato,
        partidoId,
        cargoDisputado,
        status: "ativo",
      });

      res.render("cadastroCandidato", {
        eleitores,
        partidos,
        cargos,
        mensagem: "Candidato cadastrado com sucesso.",
        erro: null,
      });
    } catch (error) {
      console.log(error);
      res.send("Erro ao salvar candidato.");
    }
  },
};