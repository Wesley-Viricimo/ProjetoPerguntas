const express = require("express");
const app = express();

//Apontando para a instância do express que a view engine que será utilizada é o EJS;
app.set('view engine', 'ejs');


app.get("/:nome?/:lang?", function(req, res){
    let nome = req.params.nome; //Pegando a informação que o usuário digitar na rota e salvando na variável nome;
    let lang = req.params.lang;

    if(!nome){ //Se nenhum nome for informado 
        nome = "Não identificado";
    }
    if(!lang){ //Se nenhuma linguagem for informada
        lang = "Não identificada";
    }
    res.render("index", { //Setando o arquivo index.ejs para ser renderizado quando o usuário acessar a rota principal;
        nome : nome, //Enviando o valor de duas variáveis criadas para dentro do html;
        lang : lang
    }); 
});

app.get("/principal", function(req, res){
    res.render("principal/perfil");//Carregando arquivo ejs dentro da pasta principal
});

app.listen(8080, () =>{
    console.log("Aplicação rodando");
});
