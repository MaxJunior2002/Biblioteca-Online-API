import Usuario from "../models/Usuario.js"
import SenhaHelper from "../helpers/SenhaHelper.js";
import TokenHelper from "../helpers/TokenHelper.js";
import UsuarioService from "../service/usuarioService.js";

class UsuarioController {

    static buscaDadosUsuario = async (req, res) => {
        const id = req.params.id;

        const usuario = await UsuarioService.buscaDados(id, req, res);

        try{
            res.status(200).send({usuario});
        }catch(erro){
            res.status(500).send({message:`${erro.message} - Falha ao buscar dados`})
        }
    }

    static cadastrarUsuario = async (req, res) => {
        let {nome, email, password} = req.body;
        password = await SenhaHelper.criaSenha(password);

        await UsuarioService.verificaUsuario(req, res);

        const usuario = new Usuario({nome, email, password});

        usuario.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar usuário`});
            }else{
                res.status(201).send(usuario.toJSON());
            }
        })
    }

    static login = async (req, res) => {
        const {email, password} = req.body;

        const usuario = await UsuarioService.verificaUsuario(req, res, true);

        await SenhaHelper.verificaSenha(res, password, usuario.password);

        try{
            
            const token = await TokenHelper.geraToken(usuario._id);

            res.status(200).json({message: 'Login realizado com sucesso!', token, id: usuario._id});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - falha ao realizar login`});
        }
    }

    static atualizaUsuario = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        if(req.body.password){
            req.body.password = await SenhaHelper.criaSenha(req.body.password);
        }

        const id = req.params.id;
        Usuario.findByIdAndUpdate(id, {$set: req.body}, (erro)=> {
            if(!erro){
                res.status(204).send({message: 'Usuario atualizado com sucesso!'});
            }else{
                res.status(500).send({message: `${erro.message} - Não foi possivel atualizar o usuario.`});
            }
        })
    }

    static deletaUsuario = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        let id = req.params.id;
        Usuario.findByIdAndDelete(id, (erro) => {
            if(erro){
                res.status(500).send({message: `${erro.message} - Não foi possivel deletar o usuario`});
            }else{
                res.status(202).send({message: 'Usuario deletado com sucesso!'});
            }
        })
    }
}

export default UsuarioController;