import express from "express";
import usuarioRoutes from "./usuarioRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Bem vindo a Biblioteca Online API"});
    })

    app.use(
        express.json(),
        usuarioRoutes
    )
}

export default routes;