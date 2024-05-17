const express = require('express');
const app = express();
var path = require('path');
const fs = require('fs');
//const { v4: uuidv4 } = require('uuid');
const cors = require('cors');


app.use(cors());

app.use(express.json()); // permite o uso do formato JSON nos requests
/*app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
               
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    console.log('teste');
    app.use(cors());
    next();
});*/

// Configura a rota para a página inicial
app.get('/', function (req, res) {

   

    app.use(express.static(__dirname));
     res.sendFile(__dirname + '/index.html');
});



// Inicia o servidor na porta 3000
app.listen(2222, function () {
    console.log('Servidor iniciado na porta 2222');
});