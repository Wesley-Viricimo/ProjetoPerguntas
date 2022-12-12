const bodyParser = require("body-parser");
const express = require("express");
const app = express();
//Recuperando o objeto de conexão que foi exportado;
const connection = require("./database/database");
//Importando o model pergunta
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta");

//Realizando a conexão com o objeto connection instanciado. Se a conexão der certo ou falhar irá ser exibida uma mensagem 
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

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
    //Método find all é equivalente ao select *, função faz a listagem de perguntas e quando as perguntas estão prontas, são mandadas para o método then
    Pergunta.findAll({raw : true, order:[
        ['id','DESC']//Ordenando a lista de perguntas em ordem decrescente por id do mais recente para o mais antigo
    ]}).then(perguntas => {
        res.render("index", { //Comando raw : true serve para fazer uma pesquisa crua no banco de dados, trazendo apenas os dados do formulário e nada mais;
            perguntas : perguntas //Criando uma variável perguntas que irá receber as perguntas
        });  

    });
});

app.get("/perguntar", function(req, res){
    res.render("perguntas")
});

app.post("/salvapergunta", function(req, res){
    let usuario = req.body.usuario;
    let titulo = req.body.titulo; //Recebendo os valores informado pelo usuário no formulário HTML e atribuindo às variáveis
    let descricao = req.body.descricao;
    //Método create é equivalente ao insert into..
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
    Pergunta.findOne({//Método findOne serve para buscar um dado
        where : {id : id} //Buscar no banco de dados uma pergunta que tenha o id igual a variável id
    }).then(pergunta => { //Quando a operação de busca for concluida o método then será chamado
        if(pergunta != undefined){ //Verificando se existe uma pergunta com o id informado pelo usuário

            Resposta.findAll({
                where : {perguntaId : pergunta.id},
                order : [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta, //Enviado a variável pergunta para o html
                    respostas : respostas
                });
            })
            
        } else { //Não encontrada
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
