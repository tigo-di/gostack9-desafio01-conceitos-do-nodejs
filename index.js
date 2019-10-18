// importando dependência
const express = require('express');

// chamando a função express
const server = express();

// método use receber o método json para o servidor parsear json
server.use(express.json()); 



// porta a ser escutada
server.listen(3000);

