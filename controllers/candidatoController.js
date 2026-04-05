const Candidato = require("../models/Candidato");
const Eleitor = require("../models/Eleitor");
const Partido = require("../models/Partido");

module.exports = {
  async abreCadastroCandidato(req, res) {
    try {
      const eleitores = await Eleitor.findAll({
        where: { status: "ativo" },
      });

      const partidos = await Partido.findAll();

      res.render("cadastroCandidato", {
        eleitores,
        partidos,
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

      const numeroExistente = await Candidato.findOne({
        where: { numeroCandidato: numeroCandidato },
      });

      if (numeroExistente) {
        return res.render("cadastroCandidato", {
          eleitores,
          partidos,
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
        mensagem: "Candidato cadastrado com sucesso.",
        erro: null,
      });
    } catch (error) {
      console.log(error);
      res.send("Erro ao salvar candidato.");
    }
  },
};