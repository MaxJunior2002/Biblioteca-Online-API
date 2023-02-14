import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .post("/livros/:id", LivroController.cadastraLivro);

export default router;
