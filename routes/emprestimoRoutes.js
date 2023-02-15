import express from "express";
import EmprestimoController from "../controllers/empretimosController.js";

const router = express.Router();

router
    .post("/emprestimos/registrar", EmprestimoController.criaEmprestimo);

export default router;    