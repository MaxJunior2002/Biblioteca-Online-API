import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.buscaLivroPorTitulo)
    .get("/livros/:id", LivroController.buscaLivroPorId)
    .post("/livros/usuario/:id", LivroController.cadastraLivro)
    .post("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletaLivro)

export default router;
