import TokenHelper from "../helpers/TokenHelper.js";
import Emprestimo from "../models/Emprestimo.js";

class EmprestimoService{
    static BuscaPorId = (req, res) => {
        let id = req.params.id;

        const emprestimo = Emprestimo.findById(id);

        if(!emprestimo){
            return res.status(404).send({message: 'Emprestimo não encontrado'});
        }

        return emprestimo;
    }
}

export default EmprestimoService;