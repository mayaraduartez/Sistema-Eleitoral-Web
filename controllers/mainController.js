const Eleitor = require("../models/Eleitor");
const Solicitacao = require("../models/Solicitacao");
const Partido = require("../models/Partido");
const Cargo = require("../models/Cargo");
const { Op } = require("sequelize");

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
};

