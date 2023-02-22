import mongoose from "mongoose";

mongoose.connect("CODIGO DE CONEXÃO");

let db = mongoose.connection;

export default db;