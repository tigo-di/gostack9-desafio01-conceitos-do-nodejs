const express = require('express'); // importando dependência

// chamando a função express
const server = express();

// método use receber o método json para o servidor parsear json
server.use(express.json()); 


// contador de requests
let countRequests = 0;


// middleware global para imprimir o número de request a cada request
server.use((req, res, next) => {

    countRequests = countRequests + 1;

    console.log(`${countRequests}`)

    return next();

})



/*
    Middleware local ifExistItemInArray
    verifica a existência de um Item no array
    projects através da localização da sua posição.

    Se o item é encontrado,
    a sua posição é salva na variável req
    para ser usada em middlewares
    que requerem a existêcia do item no array

*/
function ifExistItemInArray (req, res, next) {

    const { id } = req.params;

    /*
        map vai gerar um vetor utilizando o valor de id 
        de cada item do array projects
    */
    const positionInArray = projects.map((currentItem) => currentItem.id).indexOf(`${id}`);


        // O fluxo se encerra aqui se item não foi encontrado no vetor
        if(positionInArray === -1) {
            return res.status(400).json({'message':'Esse projeto não existe'})
        } 

    /*
        Com a posição do item guardada
        em positionInArray o fluxo continua
    */
    req.positionInArray = positionInArray; 

    return next();

}



// array para guardar os PROJETOS e suas TAREFAS
const projects = [];


// rota para CRIAR um projeto
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


// rota para RECUPERAR os projetos
server.get('/projects', (req, res) => (

    res.json(projects)

))


// rota para ALTERAR o título de um PROJETO
server.put('/projects/:id', ifExistItemInArray, (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    // req.positionInArray definido no Middleware ifExistInArray
    projects[req.positionInArray].title = title;

    // retornando a resposta em json
    return res.json({ 'message': `Título do Projeto ${id} alterado`})

})


// rota para DELETAR um PROJETO
server.delete('/projects/:id', ifExistItemInArray, (req, res) => {

    projects.splice(req.positionInArray,1);

    return res.json({ 'message': `Projeto ${id} deletado`})

})



// rota para CRIAR uma TAREFA em um Projeto
server.post('/projects/:id/tasks', ifExistItemInArray, (req, res) => {
    
    const { id } = req.params;
    
    // título da Tafera    
    const { title } = req.body;

    // req.positionInArray definido no Middleware ifExistInArray
    projects[req.positionInArray].tasks.push(title)

    return res.json({ 'message': `Nova tarefa criada no Projeto ${id}`})

})




// porta a ser escutada
server.listen(3000);

