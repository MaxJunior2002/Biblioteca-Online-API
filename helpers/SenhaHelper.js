import bcrypt from "bcrypt";

class SenhaHelper{

    static async criaSenha(senha){
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        return passwordHash;
    }
}

export default SenhaHelper;