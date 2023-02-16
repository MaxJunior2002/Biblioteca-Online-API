import Usuario from "../models/Usuario.js"
import TokenHelper from "../helpers/TokenHelper.js";

class UsuarioService {

    static buscaDados = async (id, req, res) => {
        await TokenHelper.verificaToken(req, res);

        const usuario = await Usuario.findById(id, "-password");

        if(!usuario){
            return res.status(404).send({message: 'Usuário não encontrado'});
        }

        return usuario;
    }

    static verificaUsuario = async (req, res, login = null) => {

        const usuarioExiste = await Usuario.findOne({email: req.body.email});

        if(usuarioExiste && login){
            return usuarioExiste;
        }

        if(usuarioExiste){
            return res.status(422).send({message: 'Usuário já existe'});
        }
    }


}

export default UsuarioService;