import express from "express";
import EmprestimoController from "../controllers/empretimosController.js";

const router = express.Router();

router
    .get("/emprestimos/:id", EmprestimoController.buscaEmprestimoPorId)
    .post("/emprestimos", EmprestimoController.criaEmprestimo)
    .put("/emprestimos/:id", EmprestimoController.atualizaEmprestimo)
    .delete("/emprestimos/:id", EmprestimoController.deletaEmprestimo)

export default router;    