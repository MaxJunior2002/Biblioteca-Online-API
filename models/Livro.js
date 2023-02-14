import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {type: String, required: true},
        resumo: {type: String, required: true},
        proprietario: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const livro = mongoose.model("livros", livroSchema);

export default livro;