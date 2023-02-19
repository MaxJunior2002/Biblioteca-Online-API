import TokenHelper from "../helpers/TokenHelper.js";
import Emprestimo from "../models/Emprestimo.js";

class EmprestimoService{
    static BuscaPorId = async (req, res) => {
        let id = req.params.id;

        await TokenHelper.verificaToken(req, res);

        const emprestimo = await Emprestimo.findById(id);

        if(!emprestimo){
            return res.status(404).send({message: 'Emprestimo não encontrado'});
        }

        return emprestimo;
    }
}

export default EmprestimoService;