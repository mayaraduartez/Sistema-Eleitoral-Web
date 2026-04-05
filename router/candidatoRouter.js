const express = require("express");
const router = express.Router();
const candidatoController = require("../controllers/candidatoController");

router.get("/cadastroCandidato", candidatoController.abreCadastroCandidato);
router.post("/cadastroCandidato", candidatoController.salvaCadastroCandidato);

module.exports = router;