import bcrypt from "bcrypt";

class SenhaHelper{

    static async criaSenha(senha){
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        return passwordHash;
    }

    static async verificaSenha(bodyPassword, userPassword){
        return bcrypt.compare(bodyPassword, userPassword);
    }
}

export default SenhaHelper;