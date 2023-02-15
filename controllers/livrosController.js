import Livro from "../models/Livro.js";
import Usuario from "../models/Usuario.js"
import TokenHelper from "../helpers/TokenHelper.js";

class LivroController{
    static buscaLivroPorTitulo = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const titulo = req.body.titulo;

        const livro = await Livro.findOne({titulo: titulo});

        if(!livro){
            return res.status(404).send({message: 'Livro não encontrado'});
        }

        try{
            res.status(200).send({livro});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Falha ao buscar dados`});
        }
    }

    static buscaLivroPorId = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        let id = req.params.id;

        const livro = await Livro.findById(id);

        if(!livro){
            return res.status(404).send({message: 'Livro não encontrado'});
        }

        try{
            res.status(200).send({livro});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Falha ao buscar dados`});
        }
    }

    static cadastraLivro = async (req, res) => {
        let {titulo, resumo} = req.body;

        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const id = req.params.id;

        const usuario = await Usuario.findById(id, "-password");
        let proprietario = usuario.nome;

        if(!usuario){
            return res.status(404).send({message: "Usuário não encontrado"});
        }

        const livro = new Livro({titulo, resumo, proprietario});

        livro.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro`});
            }else{
                res.status(201).send(livro.toJSON());
            }
        })
    }

    static atualizaLivro = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const id = req.params.id;

        Livro.findByIdAndUpdate(id,{$set: req.body}, (erro) => {
            if(erro){
                res.status(500).send({message: `${erro.message} - Não foi possivel atualizar o livro.`});
            }else{
                res.status(204).send({message: "Livro atualizado com sucesso!"});
            }
        })
    }

    static deletaLivro = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const id = req.params.id;

        Livro.findByIdAndDelete(id, (erro) => {
            if(erro){
                res.status(500).send({message: `${erro.message} - Não foi possivel deletar o livro.`});
            }else{
                res.status(202).send({message: "Livro deletado com sucesso!"});
            }
        })
    }
}

export default LivroController;