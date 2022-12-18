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

Pergunta.sync({force : false}).then(() => {
    console.log("Tabela criada!");
});

module.exports = Pergunta;