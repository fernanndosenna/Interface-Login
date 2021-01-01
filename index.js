const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session"); //sistema de login
const UsersController = require("./users/UsersController")
const connection = require("./database/database") //conexão banco
//ejs
app.set("view engine", "ejs")

//sessions para sistema de login

app.use(session({ //gerando a sessao para o login para ter acesso a todas as rotas admin
    secret: "qualquercoisa", cookie: {maxAge:30000}
}))

//Body parser para pegar dados do formulario
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//static
app.use(express.static('public'));


// configuracao da conexao com o banco de dados
connection
        .authenticate()
        .then(() => {
            console.log("COnexao feita com sucesso")
        }).catch((error) => {
            console.log(error)
})


//importando rotas dos controllers
app.use("/", UsersController);




app.listen(8080, () => {
    console.log(`rodando na porta 8080`)
})