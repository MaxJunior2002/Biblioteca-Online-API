import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;