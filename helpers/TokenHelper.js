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
}

export default TokenHelper;