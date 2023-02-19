import Emprestimo from "../models/Emprestimo.js";
import TokenHelper from "../helpers/TokenHelper.js";
import DataHelper from "../helpers/DataHelper.js";
import EmprestimoService from "../service/emprestimoService.js";

class EmprestimoController{

    static buscaEmprestimoPorId = async (req, res) => {
        const emprestimo = await EmprestimoService.BuscaPorId(req, res);

        try{
            res.status(200).send({emprestimo});
        }catch(erro){
            res.status(500).send({message: `${erro.message} - Não foi possivel localizar o emprestimo`});
        }
    }

    static criaEmprestimo = async (req, res) => {
        let {livro, emprestado, dono} = req.body;

        let data = await DataHelper.geraData();

        await TokenHelper.verificaToken(req, res);

        const emprestimo = new Emprestimo({livro, emprestado, dono, data});

        emprestimo.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro`});
            }else{
                res.status(201).send(emprestimo.toJSON());
            }
        })
    }

    static atualizaEmprestimo = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        const id = req.params.id;

        Emprestimo.findByIdAndUpdate(id,{$set: req.body}, (erro) => {
            if(!erro){
                res.status(202).send({message: "Emprestimo atualizado com sucesso!"});
            }else{
                res.status(500).send({message: `${erro.message} - Não foi possivel atualizar o emprestimo.`});
            }
        })
    }

    static deletaEmprestimo = async (req, res) => {
        await TokenHelper.verificaToken(req, res);

        const id = req.params.id;

        Emprestimo.findByIdAndDelete(id, (erro) => {
            if(erro){
                res.status(500).send({message: `${erro.message} - Não foi possivel deletar o emprestimo.`});
            }else{
                res.status(202).send({message: "Emprestimo deletado com sucesso!"});
            }
        })
    }
}

export default EmprestimoController;