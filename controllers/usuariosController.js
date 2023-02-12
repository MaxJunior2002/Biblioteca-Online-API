import Usuario from "../models/Usuario.js"
import SenhaHelper from "../helpers/SenhaHelper.js";
import TokenHelper from "../helpers/TokenHelper.js";

class UsuarioController {

    static buscaDadosUsuario = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const id = req.params.id;

        const usuario = await Usuario.findById(id, "-password");

        if(!usuario){
            return res.status(404).send({message: 'Usuário não encontrado'});
        }

        try{
            res.status(200).send({usuario});
        }catch(erro){
            res.status(500).send({message:`${erro.message} - Falha ao buscar dados`})
        }
    }

    static cadastrarUsuario = async (req, res) => {
        let {nome, email, password} = req.body;
        
        password = await SenhaHelper.criaSenha(password);

        const usuario = new Usuario({nome, email, password});

        const usuarioExiste = await Usuario.findOne({email: usuario.email});

        if(usuarioExiste){
            return res.status(422).send({message: 'Usuário já existe'});
        }

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

        if(!email){
            return res.status(422).send({message: "Email obrigatorio!"});
        }
        if(!password){
            return res.status(422).send({message: "Senha obrigatoria!"});
        }

        const usuario = await Usuario.findOne({email: email});

        if(!usuario){
            return res.status(404).send({message: 'Usuário não encontrado'});
        }

        const verificaSenha = await SenhaHelper.verificaSenha(password, usuario.password);

        if(!verificaSenha){
            return res.status(422).send({message: 'Senha inválida!'});
        }

        try{
            
            const token = await TokenHelper.geraToken(usuario._id);

            res.status(200).json({message: 'Login realizado com sucesso!', token});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - falha ao realizar login`});
        }
    }

    static atualizaUsuario = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        if(req.body.password){
            req.body.password = await SenhaHelper.criaSenha(req.body.password);
        }

        const id = req.params.id;
        Usuario.findByIdAndUpdate(id, {$set: req.body}, (erro)=> {
            if(!erro){
                res.status(204).send({message: 'Usuario atualizado com sucesso!'});
            }else{
                res.status(500).send({message: `${erro.message} - Não foi possivel atualizar o usuario.`})
            }
        })
    }

    static deletaUsuario = async (req, res) => {
        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

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