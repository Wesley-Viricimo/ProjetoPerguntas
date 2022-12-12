const Sequelize = require("sequelize");
const connection = require("./database");

//Criando o model pergunta, com as colunas usuário, título e descrição.
const Pergunta = connection.define('pergunta',{
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Passando o model criado para o banco de dados e setando para não forçar a criação caso a tabela já exista.
Pergunta.sync({force : false}).then(() => {
    console.log("Tabela criada!");
});

//Exportando o model pergunta
module.exports = Pergunta;