import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
    .get("/usuarios/:id",UsuarioController.buscaDadosUsuario)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .post("/usuarios/login", UsuarioController.login)
    .put("/usuarios/:id",UsuarioController.atualizaUsuario)
    .delete("/usuarios/:id", UsuarioController.deletaUsuario)

export default router;