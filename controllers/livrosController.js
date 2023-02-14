import Livro from "../models/Livro.js";
import Usuario from "../models/Usuario.js"
import TokenHelper from "../helpers/TokenHelper.js";

class LivroController{
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
}

export default LivroController;