const Eleitor = require("../models/Eleitor");

async function abreCadastroEleitores(req, res){
    res.render("cadastroEleitoral.ejs");
}

async function salvaCadastroEleitores(req, res) {
    const { nome, sobrenome, email, cpf, dataNasc, titulo, rua, numeroCasa, bairro, cidade, estado } = req.body;

    try {
        await Eleitor.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf,
            data_nascimento: dataNasc,
            titulo: titulo,
            rua: rua,
            nro_endereco: numeroCasa,
            bairro: bairro,
            cidade: cidade,
            UF: estado
        });
        res.redirect('/sucesso'); 
    } catch (error) {
        console.error("Erro ao salvar eleitor:", error);
        res.status(500).send("Erro ao salvar eleitor");
    }
}

module.exports ={
    abreCadastroEleitores,
    salvaCadastroEleitores
}