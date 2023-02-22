import express from "express";
import db from "../config/dbConnect.js";
import routes from "../routes/index.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert {type: "json"};

const app = express();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Conexão com banco realizada com sucesso!");
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
routes(app);

export default app;