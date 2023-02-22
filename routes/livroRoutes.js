import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros/all", LivroController.buscarTodos)
    .get("/livros/:id", LivroController.buscaLivroPorId)
    .post("/livros/usuarios/all", LivroController.buscarTodosDoUsuario)
    .post("/livros/usuarios/:id", LivroController.cadastraLivro)
    .post("/livros", LivroController.buscaLivroPorTitulo)
    .put("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletaLivro)

export default router;
