//ARQUIVO DE CONEXAO COM O BANCO DE DADOS//
const sequelize = require('sequelize');

const connection = new sequelize('interlogin', 'fernando','Hertz94773195',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;