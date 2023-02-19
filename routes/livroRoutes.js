import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros/usuarios/all", LivroController.buscarTodosDoUsuario)
    .get("/livros/all", LivroController.buscarTodos)
    .get("/livros/:id", LivroController.buscaLivroPorId)
    .get("/livros", LivroController.buscaLivroPorTitulo)
    .post("/livros/usuarios/:id", LivroController.cadastraLivro)
    .put("/livros/:id", LivroController.atualizaLivro)
    .delete("/livros/:id", LivroController.deletaLivro)

export default router;
