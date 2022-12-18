const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", function(req, res){
    Pergunta.findAll({raw : true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index", { 
            perguntas : perguntas
        });  

    });
});

app.get("/perguntar", function(req, res){
    res.render("perguntas")
});

app.post("/salvapergunta", function(req, res){
    let usuario = req.body.usuario;
    let titulo = req.body.titulo; 
    let descricao = req.body.descricao;
    Pergunta.create({
        usuario: usuario,
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    const id = req.params.id;


    Pergunta.findOne({
        where : {id : id} 
    }).then(pergunta => { 
        if(pergunta != undefined){ 

            Resposta.findAll({
                where : {perguntaId : pergunta.id},
                order : [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta, 
                    respostas : respostas
                });
            })
            
        } else { 
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    let resposta = req.body.resposta;
    const perguntaId = req.body.perguntaId;
    Resposta.create({
        resposta : resposta,
        perguntaId : perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080, () =>{
    console.log("Aplicação rodando");
});
