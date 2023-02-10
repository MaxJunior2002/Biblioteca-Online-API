import mongoose from "mongoose";

mongoose.connect("mongodb+srv://max:1234@cluster0.orjtldw.mongodb.net/");

let db = mongoose.connection;

export default db;