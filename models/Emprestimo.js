import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema(
    {
        id: {type: String},
        livro: {type: mongoose.Types.ObjectId, ref: 'livros'},
        emprestado: {type: mongoose.Types.ObjectId, ref:'usuarios'},
        dono: {type: mongoose.Types.ObjectId, ref: 'usuarios'},
        data: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const emprestimo = mongoose.model('emprestimos', emprestimoSchema);

export default emprestimo;