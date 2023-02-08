import express from "express";
import db from "../config/dbConnect.js"

const app = express();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Conexão com banco realizada com sucesso!");
})

app.get('/', (req, res) => {
    res.status(200).json({msg: "API conectada com sucesso!"});
})

app.use(express.json());

export default app;