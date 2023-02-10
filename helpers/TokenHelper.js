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

    static async verificaToken(req){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        return jsonwebtoken.verify(token, secret);
    }
}

export default TokenHelper;