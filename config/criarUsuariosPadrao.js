const bcrypt = require("bcrypt");
const Eleitor = require("../models/Eleitor");

async function criarUsuariosPadrao() {
  try {
    const senhaAdmin = "admin123";
    const senhaTecnico = "tecnico123";

    const usuarios = [
      {
        nome: "Administrador",
        sobrenome: "Sistema",
        cpf: "00000000000",
        email: "admin@sistema.com",
        senha: senhaAdmin,
        perfil: "admin",
        secao_id: null,
        status: "ativo"
      },
      {
        nome: "Técnico",
        sobrenome: "Judiciário",
        cpf: "11111111111",
        email: "tecnico@sistema.com",
        senha: senhaTecnico,
        perfil: "tecnico",
        secao_id: null,
        status: "ativo"
      }
    ];

    for (const usuario of usuarios) {
      const existe = await Eleitor.findOne({
        where: { email: usuario.email }
      });

      if (!existe) {
        await Eleitor.create(usuario);
        console.log(`Usuário criado: ${usuario.email}`);
      }
    }
  } catch (error) {
    console.error("Erro ao criar usuários padrão:", error);
  }
}

module.exports = criarUsuariosPadrao;