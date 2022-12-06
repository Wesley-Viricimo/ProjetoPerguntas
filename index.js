const bodyParser = require("body-parser");
const express = require("express");
const app = express();

//Apontando para a instância do express que a view engine que será utilizada é o EJS;
app.set('view engine', 'ejs');

//Setando no express o nome da pasta que irá conter os arquivos estáticos da aplicação
app.use(express.static('public'));

//Função para decodificar informações enviada pelo usuário no formulário
//app.use(bodyParser.urlencoded({extended : false}));// => Não é mais utilizado
app.use(express.urlencoded({ extended: true }))

//Permite a leitura de dados enviados no formato json
//app.use(bodyParser.json());// => Não é mais utilizado
app.use(express.json());


app.get("/", function(req, res){
    res.render("index"); 
});

app.get("/perguntar", function(req, res){
    res.render("perguntas")
});

app.post("/salvapergunta", function(req, res){
    let titulo = req.body.titulo; //Recuperando o valor informado pelo usuário no formulário HTML e atribuindo às variáveis
    let descricao = req.body.descricao;

    res.send("Formulário recebido! titulo " + titulo + " descricao " + descricao);
});

app.listen(8080, () =>{
    console.log("Aplicação rodando");
});
