import Emprestimo from "../models/Emprestimo.js";
import TokenHelper from "../helpers/TokenHelper.js";
import DataHelper from "../helpers/DataHelper.js"

class EmprestimoController{
    static criaEmprestimo = async (req, res) => {
        let {livro, emprestado, dono} = req.body;

        let data = await DataHelper.geraData();

        let testeToken = await TokenHelper.verificaToken(req);
        if(!testeToken){
            return res.status(400).send({message: 'Token inválido'});
        }

        const emprestimo = new Emprestimo({livro, emprestado, dono, data});

        emprestimo.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro`});
            }else{
                res.status(201).send(emprestimo.toJSON());
            }
        })
    }
}

export default EmprestimoController;