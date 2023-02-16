import jsonwebtoken from "jsonwebtoken";

const secret = 'ajkjioen0395830195*/';

class TokenHelper{

    static async geraToken(id){

        const token = jsonwebtoken.sign(
            {
                id: id,
            },
            secret,
        )

        return token;
    }

    static async verificaToken(req, res){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let correto = true;

        jsonwebtoken.verify(token, secret, (erro, decoded) => {

            if(erro){
                correto = false;
            }
        })
        
        if(!correto){
            return res.status(400).send({message: 'Token inválido'});
        }
    }
}

export default TokenHelper;