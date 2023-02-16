import TokenHelper from "../helpers/TokenHelper.js";
import Livro from "../models/Livro.js";

class LivroService {
    static buscaDados = async (req, res, id = null) => {
        await TokenHelper.verificaToken(req, res);

        let livro = 'null';

        try { 
            if(id){
                livro = await Livro.findById(id);
            }else{
                livro = await Livro.findOne({titulo: req.body.titulo});
            }

        } catch (erro) {
            return res.status(404).send({message: `${erro.message} -  Não foi possivel encontrar o livro.`});
        }
        return livro;
    }
}

export default LivroService;