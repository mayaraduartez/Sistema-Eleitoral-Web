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

//Função que renderiza a tela de exclusão ou inativação do servidor
async function tela_gerenciar_eleitor(req,res) {
    try{
        const eleitores= await Eleitor.findAll();

        return res.render('gerenciarEleitor',{eleitores});
    }catch(error){
        console.error(error);
        return res.status(500).send('Erro ao carregar a página');
    }
}

//Função de excluir eleitor
async function excluirEleitor(req, res) {
    try{
        const{ id } = req.params;

        await Eleitor.destroy({
            where: { id }
        });

        return res.redirect('/gerenciarEleitor');
    }catch(error){
        console.error(error);
        return res.status(500).send('Erro ao excluir eleitor');
    }
}

//Função de inativar eleitor

async function inativarEleitor(req, res) {
    try{
        const { id } = req.params;
        
        await Eleitor.update(
            { status : "inativo" },
            { where: { id } }
        );

        return res.redirect("/gerenciarEleitor");
    }catch(error){
        console.error(error);
        return res.status(500).send("Erro ao inativar eleitor");
    }
}

async function ativarEleitor(req, res) {
    try{
        const{ id } = req.params;

        await Eleitor.update(
            { status: "ativo" },
            { where : { id }}
        );
        return res.redirect("/gerenciarEleitor");
    }catch(error){
        console.error(error);
        return res.status(500).send("Erro ao ativar eleitor.")
    }
}


module.exports ={
    abreCadastroEleitores,
    salvaCadastroEleitores,
    tela_gerenciar_eleitor,
    excluirEleitor,
    inativarEleitor,
    ativarEleitor
}