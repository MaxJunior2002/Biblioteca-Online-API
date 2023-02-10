import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .post("/usuarios/login", UsuarioController.login)

export default router;