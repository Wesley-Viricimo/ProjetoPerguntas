const express = require("express");
const app = express();

//Apontando para a instância do express que a view engine que será utilizada é o EJS;
app.set('view engine', 'ejs');

//Setando no express o nome da pasta que irá conter os arquivos estáticos da aplicação
app.use(express.static('public'));


app.get("/", function(req, res){
    res.render("index"); 
});

app.get("/perguntar", function(req, res){
    res.render("perguntas")
});

app.listen(8080, () =>{
    console.log("Aplicação rodando");
});
