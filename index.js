const express = require('express'); // importando dependência

// chamando a função express
const server = express();

// método use receber o método json para o servidor parsear json
server.use(express.json()); 


// array para guardar os projetos e suas tarefas
const projects = [];


// rota para criar um projeto
server.post('/projects', (req, res) => {

    // desestruturação 
    const { id } =  req.body;
    const { title } =  req.body;

    // método push para adicionar novo item ao array
    projects.push({
        id: id,
        title: title,
        tasks: []
    });

    // retornando a resposta em json
    return res.json({ 'message': 'Projeto criado'})

})


// rota para recuperar os projetos
server.get('/projects', (req, res) => (

    res.json(projects)

))


// porta a ser escutada
server.listen(3000);

