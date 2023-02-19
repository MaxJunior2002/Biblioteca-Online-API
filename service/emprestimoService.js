import TokenHelper from "../helpers/TokenHelper.js";
import Emprestimo from "../models/Emprestimo.js";

class EmprestimoService{
    static buscaPorId = async (req, res) => {
        let id = req.params.id;

        await TokenHelper.verificaToken(req, res);

        const emprestimo = await Emprestimo.findById(id);

        if(!emprestimo){
            return res.status(404).send({message: 'Emprestimo não encontrado'});
        }

        return emprestimo;
    }

    static buscarTodos = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        let emprestimos = {};

        try{
            emprestimos = await Emprestimo.find();
        }catch(erro){
            return res.status(404).send({message: `${erro.message} - Não foi possivel buscar os emprestimos`});
        }

        return emprestimos;
    }

    static buscarPorDono = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        let emprestimos = {};

        try{
            emprestimos = Emprestimo.find({dono: req.params.id});
        }catch(erro){
            return res.status(404).send({message: `${erro.message} - Não foi possivel buscar os emprestimos`});
        }

        return emprestimos;
    }

    static buscarPorEmprestado = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        let emprestimo = {};

        try{
            emprestimo = await Emprestimo.findOne({emprestado: req.params.id});
        }catch(erro){
            return res.status(404).send({message: `${erro.message} - Não foi possivel buscar os emprestimos`});
        }

        return emprestimo;
    }
}

export default EmprestimoService;