const Eleitor = require("../models/Eleitor");
const Solicitacao = require("../models/Solicitacao");
const Partido = require("../models/Partido");
const Cargo = require("../models/Cargo");
const Candidato = require("../models/Candidato");
const ZonaEleitoral = require("../models/Zona_Eleitoral");
const SecaoEleitoral = require("../models/Secao_Eleitoral");
const Urna = require("../models/Urna");


const { Op } = require("sequelize");
// Registrar associações dos modelos
// DEFINIR ASSOCIAÇÕES DIRETAMENTE (sem usar o método associate)
// Isso é mais confiável e evita problemas de ordem

// Candidato pertence a Eleitor, Partido e Cargo
Candidato.belongsTo(Eleitor, { foreignKey: 'eleitor_id' });
Candidato.belongsTo(Partido, { foreignKey: 'partido_id' });
Candidato.belongsTo(Cargo, { foreignKey: 'cargo_id' });

// Eleitor tem um Candidato
Eleitor.hasOne(Candidato, { foreignKey: 'eleitor_id' });

// Partido tem muitos Candidatos
Partido.hasMany(Candidato, { foreignKey: 'partido_id' });

// Cargo tem muitos Candidatos
Cargo.hasMany(Candidato, { foreignKey: 'cargo_id' });

// Se Solicitacao precisar de associações, adicione aqui também
  SecaoEleitoral.belongsTo(ZonaEleitoral, {foreignKey: 'zonaEleitoral_id'});
  ZonaEleitoral.hasMany(SecaoEleitoral, { foreignKey: 'zonaEleitoral_id' });


console.log('✅ Associações registradas com sucesso!');

  



async function abreCadastroEleitores(req, res){
    const mensagem = '';
    res.render("cadastroEleitoral.ejs", { mensagem });
}

async function salvaCadastroEleitores(req, res) {
    const { nome, sobrenome, email, cpf, dataNasc, titulo, rua, numeroCasa, bairro, cidade, estado } = req.body;

    try {
        const eleitorExistente = await Eleitor.findOne({
            where: {
                [require("sequelize").Op.or]: [
                    { email: email },
                    { cpf: cpf }
                ]
            }
        });

        if (eleitorExistente) {
            let mensagem = "";

            if (eleitorExistente.email === email && eleitorExistente.cpf === cpf) {
                mensagem = "CPF e e-mail já estão cadastrados.";
            } else if (eleitorExistente.email === email) {
                mensagem = "Este e-mail já está cadastrado.";
            } else if (eleitorExistente.cpf === cpf) {
                mensagem = "Este CPF já está cadastrado.";
            }

            return res.render("cadastroEleitoral.ejs", { mensagem });
        }

        const eleitor = await Eleitor.create({
            nome,
            sobrenome,
            email,
            cpf,
            data_nascimento: dataNasc,
            titulo,
            rua,
            nro_endereco: numeroCasa,
            bairro,
            cidade,
            UF: estado
        });

        console.log(eleitor.id);

        const mensagem = "Cadastro realizado com sucesso!";
        return res.render("cadastroEleitoral.ejs", { mensagem });

    } catch (error) {
        console.error("Erro ao salvar eleitor:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            let mensagem = "CPF ou e-mail já cadastrado.";

            const campos = error.errors.map(e => e.path);

            if (campos.includes("cpf") && campos.includes("email")) {
                mensagem = "CPF e e-mail já estão cadastrados.";
            } else if (campos.includes("cpf")) {
                mensagem = "Este CPF já está cadastrado.";
            } else if (campos.includes("email")) {
                mensagem = "Este e-mail já está cadastrado.";
            }

            return res.render("cadastroEleitoral.ejs", { mensagem });
        }

        return res.status(500).send("Erro ao salvar eleitor");
    }
}

// Função que renderiza a tela de exclusão ou inativação do servidor
async function tela_gerenciar_eleitor(req,res) {
    try{
        const eleitores = await Eleitor.findAll();
        return res.render('gerenciarEleitor',{eleitores});
    } catch(error){
        console.error(error);
        return res.status(500).send('Erro ao carregar a página');
    }
}

// Função de excluir eleitor
async function excluirEleitor(req, res) {
    try{
        const { id } = req.params;
        await Eleitor.destroy({
            where: { id }
        });
        return res.redirect('/gerenciarEleitor');
    } catch(error){
        console.error(error);
        return res.status(500).send('Erro ao excluir eleitor');
    }
}

// Função de inativar eleitor
async function inativarEleitor(req, res) {
    try{
        const { id } = req.params;
        await Eleitor.update(
            { status : "inativo" },
            { where: { id } }
        );
        return res.redirect("/gerenciarEleitor");
    } catch(error){
        console.error(error);
        return res.status(500).send("Erro ao inativar eleitor");
    }
}

// Função de ativar eleitor
async function ativarEleitor(req, res) {
    try{
        const { id } = req.params;
        await Eleitor.update(
            { status: "ativo" },
            { where : { id }}
        );
        return res.redirect("/gerenciarEleitor");
    } catch(error){
        console.error(error);
        return res.status(500).send("Erro ao ativar eleitor.");
    }
}


async function visualizarPerfil(req, res) {
    try {
        const { id } = req.params;
        const eleitor = await Eleitor.findByPk(id);

        if (!eleitor) {
            return res.status(404).send("Eleitor não encontrado.");
        }

        // Renderiza a view perfilEleitor passando o objeto eleitor
        return res.render("perfilEleitor.ejs", { eleitor });
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        return res.status(500).send("Erro interno ao carregar perfil.");
    }
}

//função de solicitação de atualização de dados do eleitor

async function abreSolicitacao(req, res) {
    try {
        // Renderiza a mesma tela
          res.render("solicitarAtualizacao.ejs");
          
    } catch (error) {
        console.error("Erro ao redirecionar solicitação:", error);
        return res.status(500).send("Erro interno ao redirecionar.");
    }
}


async function solicitarAtualizacao(req, res) {
    try {
        const { nome, email, mensagem } = req.body;

        // Validar campos
        if (!nome || !email || !mensagem) {
            return res.status(400).send("Todos os campos são obrigatórios.");
        }

        // Criar solicitação sem vincular ao eleitor
        await Solicitacao.create({
            nome: nome,
            email: email,
            mensagem: mensagem
            
        });

         return res.render("solicitarAtualizacao.ejs", {
            
            mensagem: "Solicitação enviada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        return res.status(500).send("Erro ao enviar solicitação.");
    }
}


async function abreAtualizacao(req, res) {
    try {
        //const id = req.session.eleitorId;
        //const id = 14; // Substitua pelo ID do eleitor logado, por exemplo, req.session.eleitorId
          const id = req.params.id; 

        if (!id) {
            return res.status(401).send("Usuário não autenticado.");
        }

        const eleitor = await Eleitor.findByPk(id);

        if (!eleitor) {
            return res.status(404).send("Eleitor não encontrado.");
        }

        res.render("atualizarDados.ejs", { eleitor });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar os dados.");
    }
}

async function atualizaDados(req, res) {
    try {
        // const id = req.session.eleitorId;
        //const id = 14;
          const id = req.params.id; 

        if (!id) {
            return res.status(401).send("Usuário não autenticado.");
        }

        const eleitor = await Eleitor.findByPk(id);

        if (!eleitor) {
            return res.status(404).send("Eleitor não encontrado.");
        }

        const eleitorExistente = await Eleitor.findOne({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { email: req.body.email },
                            { cpf: req.body.cpf }
                        ]
                    },
                    {
                        id: { [Op.ne]: id }
                    }
                ]
            }
        });

        if (eleitorExistente) {
            let mensagem = "";

            if (eleitorExistente.email === req.body.email && eleitorExistente.cpf === req.body.cpf) {
                mensagem = "CPF e e-mail já estão cadastrados para outro eleitor.";
            } else if (eleitorExistente.email === req.body.email) {
                mensagem = "Este e-mail já está cadastrado para outro eleitor.";
            } else {
                mensagem = "Este CPF já está cadastrado para outro eleitor.";
            }

            return res.render("atualizarDados.ejs", {
                eleitor: {
                    ...req.body,
                    dataNasc: req.body.dataNasc
                },
                mensagem
            });
        }

        await eleitor.update({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            cpf: req.body.cpf,
            data_nascimento: req.body.dataNasc,
            titulo: req.body.titulo,
            rua: req.body.rua,
            nro_endereco: req.body.numeroCasa,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            UF: req.body.estado
        });

        return res.render("atualizarDados.ejs", {
            eleitor,
            mensagem: "Dados atualizados com sucesso!"
        });

    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.render("atualizarDados.ejs", {
                eleitor: {
                    ...req.body,
                    dataNasc: req.body.dataNasc
                },
                mensagem: "CPF ou e-mail já cadastrado."
            });
        }

        return res.status(500).send("Erro ao atualizar os dados.");
    }
}

async function abreCadastroPartido(req, res){
    const mensagem = '';
    res.render("cadastroPartido.ejs", { mensagem });
}

async function salvaCadastroPartido(req, res) {
    const { nomePartido, sigla, ideologia, numero} = req.body;

    try {
        const partidoExistente = await Partido.findOne({
            where: {
                [require("sequelize").Op.or]: [
                    { nomePartido: nomePartido },
                    { numero: numero }
                ]
            }
        });

        if (partidoExistente) {
            let mensagem = "";

            if (partidoExistente.nomePartido === nomePartido && partidoExistente.numero === numero) {
                mensagem = "Numero partidario e Nome partidario já estão cadastrados.";
            } else if (partidoExistente.nomePartido === nomePartido) {
                mensagem = "Este nome já está cadastrado.";
            } else if (partidoExistente.numero === numero) {
                mensagem = "Este número já está cadastrado.";
            }

            return res.render("cadastroPartido.ejs", { mensagem });
        }

        const partido = await Partido.create({
            nomePartido,
            sigla,
            ideologia,
            numero            
        });

        console.log(partido.id);

        const mensagem = "Cadastro realizado com sucesso!";
        return res.render("cadastroPartido.ejs", { mensagem });

    } catch (error) {
        console.error("Erro ao salvar partido:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            let mensagem = "nome ou número já cadastrado.";

            const campos = error.errors.map(e => e.path);

            if (campos.includes("nomePartido") && campos.includes("numero")) {
                mensagem = "Nome ou numero já estão cadastrados.";
            } else if (campos.includes("nomePartido")) {
                mensagem = "Este nome já está cadastrado.";
            } else if (campos.includes("numero")) {
                mensagem = "Este numero já está cadastrado.";
            }

            return res.render("cadastroPartido.ejs", { mensagem });
        }

        return res.status(500).send("Erro ao salvar partido");
    }
}

async function tela_gerenciar_partido(req, res) {
    try {
        const partidos = await Partido.findAll();
        return res.render('gerenciarPartido', { partidos });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar a página de gerenciamento de partidos');
    }
}

async function excluirPartido(req, res) {
    try {
        const { id } = req.params;
        await Partido.destroy({ where: { id } });
        return res.redirect('/gerenciarPartido');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao excluir partido');
    }
}

async function editarPartido(req, res) {
    try {
        const { id } = req.params;
        const partido = await Partido.findByPk(id);

        if (!partido) {
            return res.status(404).send('Partido não encontrado');
        }

        return res.render('atualizarPartido', { partido });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar edição do partido');
    }
}

async function atualizarPartido(req, res) {
    try {
        const { id } = req.params;
        const { nomePartido, sigla, ideologia, numero} = req.body;

        const partido = await Partido.findByPk(id);
        if (!partido) {
            return res.status(404).send('Partido não encontrado');
        }

        await partido.update( { nomePartido, sigla, ideologia, numero });

        return res.redirect('/gerenciarPartido');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao atualizar partido');
    }
}


async function abreCadastroCandidato(req, res) {
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
}

async function salvaCadastroCandidato(req, res) {
  try {
    const { eleitorId, numeroCandidato, partidoId, cargoId } = req.body;

    const eleitores = await Eleitor.findAll({
      where: { status: "ativo" },
    });

    const partidos = await Partido.findAll();
    const cargos = await Cargo.findAll();


    const eleitor = await Eleitor.findOne({
      where: { id: eleitorId }
    });


    if (!eleitor || eleitor.status === "inativo") {
      return res.render("cadastroCandidato", {
        eleitores,
        partidos,
        cargos,
        mensagem: null,
        erro: "Eleitor inativo não pode ser cadastrado como candidato.",
      });
    }

    const numeroExistente = await Candidato.findOne({
      where: { numero: numeroCandidato },
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
      where: { eleitor_id: eleitorId },
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
      eleitor_id: eleitorId,
      numero: numeroCandidato,
      partido_id: partidoId,
      cargo_id: cargoId,
      status: "ativo",
    });

    return res.render("cadastroCandidato", {
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
}
//FUNÇÕES PARA CANDIDATO

async function tela_gerenciar_candidato(req, res) {
  try {
    console.log('Iniciando busca de candidatos...');
    const candidatos = await Candidato.findAll({
      include: [
        { model: Eleitor },  // sem alias
        { model: Partido },  // sem alias
        { model: Cargo }     // sem alias
      ]
    });
    
    console.log('Candidatos encontrados:', candidatos.length);
    
    return res.render('gerenciarCandidato', { candidatos });
  } catch (error) {
    console.error('Erro completo:', error);
    return res.status(500).send('Erro ao carregar a página: ' + error.message);
  }
}

// Função para inativar candidato
async function inativarCandidato(req, res) {
    try {
        const { id } = req.params; // eleitor_id
        await Candidato.update(
            { status: "inativo" },
            { where: { eleitor_id: id } }
        );
        return res.redirect("/gerenciarCandidato");
    } catch(error) {
        console.error(error);
        return res.status(500).send("Erro ao inativar candidato.");
    }
}

// Função para ativar candidato
async function ativarCandidato(req, res) {
    try {
        const { id } = req.params; // eleitor_id
        await Candidato.update(
            { status: "ativo" },
            { where: { eleitor_id: id } }
        );
        return res.redirect("/gerenciarCandidato");
    } catch(error) {
        console.error(error);
        return res.status(500).send("Erro ao ativar candidato.");
    }
}

// Função para excluir candidato
async function excluirCandidato(req, res) {
    try {
        const { id } = req.params; // eleitor_id
        await Candidato.destroy({
            where: { eleitor_id: id }
        });
        return res.redirect("/gerenciarCandidato");
    } catch(error) {
        console.error(error);
        return res.status(500).send("Erro ao excluir candidato.");
    }
}

async function tela_atualizar_candidato(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send('ID não informado');
    }

    const candidato = await Candidato.findOne({
      where: { eleitor_id: id },
      include: [
        {
          model: Eleitor,
          attributes: ['id', 'status', 'nome', 'sobrenome']
        }
      ]
    });

    if (!candidato) {
      return res.status(404).send('Candidato não encontrado');
    }

    const eleitores = await Eleitor.findAll();
    const partidos = await Partido.findAll();
    const cargos = await Cargo.findAll();

    return res.render('atualizarCandidato', {
      candidato,
      eleitores,
      partidos,
      cargos
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao carregar a página');
  }
}

async function atualizarCandidato(req, res) {
  try {
    const { id } = req.params;
    const { numero, partido_id, cargo_id } = req.body;

    const candidato = await Candidato.findOne({
      where: { eleitor_id: id }
    });

    if (!candidato) {
      return res.status(404).send('Candidato não encontrado');
    }

    // Atualiza candidato
    await candidato.update({
      numero,
      partido_id,
      cargo_id,
    });

    return res.redirect('/gerenciarCandidato');

  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao atualizar');
  }
}

async function tela_cadastro_zona_eleitoral(req, res) {
  try {
    res.render("cadastroZonaEleitoral.ejs", {
      mensagem: null,
      erro: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página");
  }
}

async function salvaCadastroZonaEleitoral(req, res) {
  try {
    let { numero, estado } = req.body;

    numero = parseInt(numero);
    estado = estado.toUpperCase().trim();

    if (!numero || !estado) {
      return res.render("cadastroZonaEleitoral.ejs", {
        erro: "Preencha todos os campos corretamente.",
        mensagem: null
      });
    }

    const zonaExistente = await ZonaEleitoral.findOne({
      where: { numero, estado }
    });

    if (zonaExistente) {
      return res.render("cadastroZonaEleitoral.ejs", {
        mensagem: "Zona já cadastrada para este estado.",
        erro: null
      });
    }

    await ZonaEleitoral.create({ numero, estado });

    return res.render("cadastroZonaEleitoral.ejs", {
      mensagem: "Zona cadastrada com sucesso!",
      erro: null
    });

  } catch (error) {
    console.error(error);

    return res.render("cadastroZonaEleitoral.ejs", {
      erro: "Erro ao cadastrar zona eleitoral.",
      mensagem: null
    });
  }
}

async function tela_gerenciar_zona_eleitoral(req, res) {
  try {
    const zonas = await ZonaEleitoral.findAll();
    res.render("gerenciarZonaEleitoral.ejs", {
      zonas,
      mensagem: null,
      erro: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página");
  }
}

async function excluirZonaEleitoral(req, res) {
  try {
    const { id } = req.params;

    const zona = await ZonaEleitoral.findOne({
      where: { id }
    });

    if (!zona) {
      return res.status(404).send('Zona eleitoral não encontrada');
    }

    await zona.destroy();
    return res.redirect('/gerenciarZonaEleitoral');

  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao excluir zona eleitoral');
  }
}

async function tela_atualizar_zona_eleitoral(req, res) {
    try {        
        const { id } = req.params;
        const zona = await ZonaEleitoral.findOne({
            where: { id }
        });

        if (!zona) {
            return res.status(404).send('Zona eleitoral não encontrada');
        }
        return res.render('atualizarZonaEleitoral', { zona });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar zona eleitoral');
    }
}

async function atualizarZonaEleitoral(req, res) {
    try {
        const { id } = req.params;
        const { numero, estado } = req.body;

        const zona = await ZonaEleitoral.findOne({
            where: { id }
        });

        if (!zona) {
            return res.status(404).send('Zona eleitoral não encontrada');
        }

        await zona.update({
            numero: parseInt(numero),
            estado: estado.toUpperCase().trim()
        });

        return res.redirect('/gerenciarZonaEleitoral');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao atualizar zona eleitoral');
    }
}

async function tela_cadastro_secao_eleitoral(req, res) {

      try {
     const zona = await ZonaEleitoral.findAll();

      res.render("secaoEleitoral", {
        ZonaEleitoral: zona,
        mensagem: null,
        erro: null,
      });
    } catch (error) {
      console.log(error);
      res.send("Erro ao carregar a página.");
    }
}
  
async function salvaCadastroSecao(req, res) {
  try {
    let { zonaEleitoral_id, nome, rua, nro_local, bairro, cidade } = req.body;
    nro_local = parseInt(nro_local);

    const zonas = await ZonaEleitoral.findAll();

    const zona = await ZonaEleitoral.findOne({
      where: { id: zonaEleitoral_id }
    });

    if (!zona || !nome || !rua || !nro_local || !bairro || !cidade) {
      return res.render("secaoEleitoral.ejs", {
        ZonaEleitoral: zonas, 
        erro: "Preencha todos os campos corretamente.",
        mensagem: null
      });
    }

    const secaoExistente = await SecaoEleitoral.findOne({
      where: { nome, rua, nro_local, bairro, cidade }
    });

    if (secaoExistente) {
      return res.render("secaoEleitoral.ejs", {
        ZonaEleitoral: zonas,
        mensagem: "Seção já cadastrada.",
        erro: null
      });
    }

    await SecaoEleitoral.create({ zonaEleitoral_id, nome, rua, nro_local, bairro, cidade });

    return res.render("secaoEleitoral.ejs", {
      ZonaEleitoral: zonas,
      mensagem: "Seção cadastrada com sucesso!",
      erro: null
    });

  } catch (error) {
    console.error(error);

    const zonas = await ZonaEleitoral.findAll().catch(() => []);

    return res.render("secaoEleitoral.ejs", {
      ZonaEleitoral: zonas,
      erro: "Erro ao cadastrar seção eleitoral.",
      mensagem: null
    });
  }
}

async function tela_gerenciar_secao_eleitoral(req, res) {
  try {
    const secoes = await SecaoEleitoral.findAll({
      include: [
   { model: ZonaEleitoral
    
   }
           
    ]
  
});
    
    res.render("gerenciarSecao.ejs", {
      secoes,
      mensagem: null,
      erro: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página");
  }
}

async function excluirSecaoEleitoral(req, res) {
  try {
    const { id } = req.params;

    const secao = await SecaoEleitoral.findOne({
      where: { id }
    });

    if (!secao) {
      return res.status(404).send('Seção eleitoral não encontrada');
    }

    await secao.destroy();
    return res.redirect('/gerenciarSecaoEleitoral');

  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao excluir seção eleitoral');
  }
}

async function tela_atualizar_secao_eleitoral(req, res) {
    try {        
        const { id } = req.params;
        const secao = await SecaoEleitoral.findOne({
            where: { id }
        });

        if (!secao) {
            return res.status(404).send('Seção eleitoral não encontrada');
        }
        return res.render('atualizarSecaoEleitoral', { secao });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar seção eleitoral');
    }
}

async function atualizarSecaoEleitoral(req, res) {
    try {
        const { id } = req.params;
        const { nome, rua, nro_local, bairro, cidade } = req.body;

        const secao = await SecaoEleitoral.findOne({
            where: { id }
        });

        if (!secao) {
            return res.status(404).send('Seção eleitoral não encontrada');
        }

        await secao.update({
            nome: nome.trim(),
            rua: rua.trim(),
            nro_local: parseInt(nro_local),
            bairro: bairro.trim(),
            cidade: cidade.trim()
        });

        return res.redirect('/gerenciarSecaoEleitoral');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao atualizar seção eleitoral');
    }
}

async function CadastrarUrna(req, res) {
  try {
    const { situacao } = req.body;

    const urna = await Urna.create({
      situacao: situacao ?? true,
    });

    return res.status(201).json({
      message: "Urna cadastrada com sucesso",
      urna,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao cadastrar urna",
      error: error.message,
    });
  }
}

async function ExcluirUrna(req, res) {
    try {
        const { id } = req.params;
        const urna = await Urna.findByPk(id);

        if (!urna) {
            return res.status(404).json({ message: "Urna não encontrada" });
        }

        await urna.destroy();
        return res.json({ message: "Urna excluída com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao excluir urna", error: error.message });
    }
}

async function AtivarUrna(urna) {
  const secao = await SecaoEleitoral.findOne({
    where: { urna_id: urna.id },
  });

  if (!secao) {
    throw new Error("Esta urna não está vinculada a nenhuma seção");
  }

  await urna.update({ situacao: true });

  return urna;
}

async function DesativarUrna(urna) {
  await urna.update({ situacao: false });

  return urna;
}

async function AtualizarUrna(req, res) {
  try {
    const { id } = req.params;
    const { situacao } = req.body;

    const urna = await Urna.findByPk(id);

    if (!urna) {
      return res.status(404).json({ message: "Urna não encontrada" });
    }

    let urnaAtualizada;

    if (situacao === true) {
      urnaAtualizada = await AtivarUrna(urna);
    } else if (situacao === false) {
      urnaAtualizada = await DesativarUrna(urna);
    } else {
      urnaAtualizada = urna;
    }

    return res.json({
      message: "Urna atualizada com sucesso",
      urna: urnaAtualizada,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao atualizar urna",
      error: error.message,
    });
  }
}

async function abreCadastroUrnas(req, res) {
    try {
        const urnas = await Urna.findAll();
        const mensagem = req.query.mensagem || '';
        res.render("cadastroUrnas.ejs", { urnas, mensagem });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar cadastro de urnas');
    }
}

async function salvaCadastroUrnas(req, res) {
    const { numero, localizacao } = req.body;
    try {
        const urnaExistente = await Urna.findOne({ where: { numero } });
        if (urnaExistente) {
            return res.redirect('/cadastroUrnas?mensagem=Número da urna já cadastrado');
        }
        await Urna.create({ numero, localizacao });
        res.redirect('/cadastroUrnas?mensagem=Urna cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar urna');
    }
}

async function inativarUrna(req, res) {
    const { id } = req.params;
    try {
        await Urna.update({ situacao: false }, { where: { id } });
        res.redirect('/cadastroUrnas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao inativar urna');
    }
}

async function ativarUrna(req, res) {
    const { id } = req.params;
    try {
        await Urna.update({ situacao: true }, { where: { id } });
        res.redirect('/cadastroUrnas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao ativar urna');
    }
}

async function excluirUrna(req, res) {
    const { id } = req.params;
    try {
        await Urna.destroy({ where: { id } });
        res.redirect('/cadastroUrnas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir urna');
    }
}


//Tela Urna
async function urnaEletronica(req, res) {
    try {
        res.render("urnaEletronica.ejs");
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar tela de urnas');
    }
}

module.exports = {
    abreCadastroEleitores,
    salvaCadastroEleitores,
    tela_gerenciar_eleitor,
    excluirEleitor,
    inativarEleitor,
    ativarEleitor,
    visualizarPerfil,
    abreSolicitacao,
    solicitarAtualizacao,
    abreAtualizacao,
    atualizaDados,
    abreCadastroPartido,
    salvaCadastroPartido,
    tela_gerenciar_partido,
    excluirPartido,
    editarPartido,
    atualizarPartido,
    abreCadastroCandidato,
    salvaCadastroCandidato,
    tela_gerenciar_candidato,
    ativarCandidato,
    inativarCandidato,
    excluirCandidato,
    tela_atualizar_candidato,
    atualizarCandidato,
    tela_cadastro_zona_eleitoral,
    salvaCadastroZonaEleitoral,
    tela_gerenciar_zona_eleitoral,
    excluirZonaEleitoral,
    tela_atualizar_zona_eleitoral,
    atualizarZonaEleitoral,
    tela_cadastro_secao_eleitoral,
    salvaCadastroSecao,
    tela_gerenciar_secao_eleitoral,
    excluirSecaoEleitoral,
    tela_atualizar_secao_eleitoral,
    atualizarSecaoEleitoral,
    CadastrarUrna,
    ExcluirUrna,
    AtualizarUrna,
    abreCadastroUrnas,
    salvaCadastroUrnas,
    inativarUrna,
    ativarUrna,
    excluirUrna,
    urnaEletronica
};

