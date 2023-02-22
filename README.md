# Biblioteca-Online-API

<p>Um projeto que simula um biblioteca online onde os usuarios podem se cadastrar, cadastrar seu livros e emprestarem uns para os outros.</p>
<p><br>Pratica de criação de API com Node Express e MongoDB</p>

### ⚠️Instruções inportantes sobre Execução local⚠️
>> Leia os READMEs
#### Como executar
##### 1. Clone este repositório

##### 2. Acesse esta pasta pelo terminal
```bash 
    cd Biblioteca-Online-API
```
##### 3. instale as dependencias com npm
> Utilize a versão LTS do Node
```bash
npm install
```
##### 4. instale o nodemon com npm
> Utilize a versão LTS do Node
```bash
npm install nodemon
```

##### 5. Conexão com o banco de dados 
- Acesse <a href="https://www.mongodb.com/cloud/atlas/register" target="blank">MongoDB Atlas</a>
- Faça login no site ou crie uma conta
- Em Database crie o seu Cluster
- No Cluster clique em Connect -> Connect your application
- Copie o codigo gerado em "2 Add your connection string into your application code"
- Em seguida substitua o "CODIGO DE CONEXÃO" por ele em 'mongoose.connect' no arquivo /config/dbConnect.js"

##### 6. Execute com o script do npm 
```bash
npm start
```

##### 7. Acesse a documentação pelo navegador
```bash
localhost:3000/api-docs
```
