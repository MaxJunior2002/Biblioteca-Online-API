import Livro from "../models/Livro.js";
import Usuario from "../models/Usuario.js"
import TokenHelper from "../helpers/TokenHelper.js";
import LivroService from "../service/livroService.js";
import UsuarioService from "../service/usuarioService.js";

class LivroController{
    static buscaLivroPorTitulo = async (req, res) => {
        const livro = await LivroService.buscaDados(req, res);

        try{
            res.status(200).send({livro});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Falha ao buscar dados`});
        }
    }

    static buscaLivroPorId = async (req, res) => {
        let id = req.params.id;

        const livro = await LivroService.buscaDados(req, res, id);

        try{
            res.status(200).send({livro});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Falha ao buscar dados`});
        }
    }

    static buscarTodos = async (req, res) => {
        const livros = await LivroService.buscarTodos(req, res);

        try{
            res.status(200).send({livros});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Falha ao buscar dados`});
        }
    }

    static cadastraLivro = async (req, res) => {
        let {titulo, resumo} = req.body;

        await TokenHelper.verificaToken(req, res);

        const id = req.params.id;

        const usuario = await UsuarioService.buscaDados(id, req, res);
        let proprietario = usuario.nome;

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
        await TokenHelper.verificaToken(req, res);

        const id = req.params.id;

        Livro.findByIdAndUpdate(id,{$set: req.body}, (erro) => {
            if(!erro){
                res.status(202).send({message: "Livro atualizado com sucesso!"});
            }else{
                res.status(500).send({message: `${erro.message} - Não foi possivel atualizar o livro.`});
            }
        })
    }

    static deletaLivro = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

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