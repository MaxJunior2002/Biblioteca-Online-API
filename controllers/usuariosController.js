import Usuario from "../models/Usuario.js"
import SenhaHelper from "../helpers/SenhaHelper.js";

class UsuarioController {

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
}

export default UsuarioController;