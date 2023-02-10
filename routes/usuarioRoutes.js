import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
    .get("/usuarios/:id",UsuarioController.buscaDadosUsuario)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .post("/usuarios/login", UsuarioController.login)

export default router;