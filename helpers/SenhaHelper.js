import bcrypt from "bcrypt";

class SenhaHelper{

    static async criaSenha(senha){
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        return passwordHash;
    }

    static async verificaSenha(res, bodyPassword, userPassword){
        if(!bcrypt.compare(bodyPassword, userPassword)){
            return res.status(422).send({message: 'Senha inválida!'});
        }
    }
}

export default SenhaHelper;