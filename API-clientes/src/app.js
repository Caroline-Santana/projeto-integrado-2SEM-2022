/********************************************************************************************************
 * Objetivo:API responsável pela manipulação de dados do Back-End                                       *
 *           (GET, POST, PUT, DELETE)                                                                   *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 * Anotações:                                                                                           *                                                                 *
 ********************************************************************************************************/
 const express = require('express')
 const bodyParser = require ('body-parser')
 const cors = require('cors')

 //Arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
const {request, response} = require('express')
const app = express()

//Configuração de cors para liberar o acesso a API
app.use((request, response,next) => {
    response.header ('Access-Control-Allow-Origin', '*')
    response.header ('Access-Control-Allow-Methods',' GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})
//Criamos um objeto que permite receber um JSON no body das requisições
const jsonParser = bodyParser.json()


/****************************************************************
*    Rotas para CRUD (read) de pizzas, bebidas, promocoes       *
*    Data: 10/12/2022                                           *
*****************************************************************/

//EndPoint para listar todas as pizzas
app.get('/v1/allpizzas', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerCardapio= require('../controller/controllerCardapio.js')
    
    
    const dadosPizza = await controllerCardapio.listarPizzas()

 
    if(dadosPizza){
        statusCode = 200
        message = dadosPizza
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para listar todas as bebidas
app.get('/v1/allbebidas', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerCardapio= require('../controller/controllerCardapio.js')
    
    
    const dadosBebidas = await controllerCardapio.listarBebidas()

 
    if(dadosBebidas){
        statusCode = 200
        message = dadosBebidas
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para listar todas as promocoes
app.get('/v1/allpromocoes', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerCardapio= require('../controller/controllerCardapio.js')
    
    
    const dadosPromocoes = await controllerCardapio.listarPromocoes()

 
    if(dadosPromocoes){
        statusCode = 200
        message = dadosPromocoes
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

//EndPoint para exibir as pizzas favoritas
app.get('/v1/pizza/favoritas', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerCardapio = require('../controller/controllerCardapio.js')
    const dadosFavs = await controllerCardapio.listarFavs(id)
        if(id != '' && id != undefined){
            if(dadosFavs){
                statusCode = 200
                message = dadosFavs
            }else{
                statusCode = 404
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    response.status(statusCode)
    response.json(message)
})

//EndPoint responsavel pela favoritação de uma pizza
app.put('/v1/pizza/favoritar/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
         headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id
            
            if(id != '' && id != undefined){
                dadosBody.id = id

                const controlleCardapio = require('../controller/controllerCardapio.js')
                const favoritando = await controlleCardapio.favoritando(dadosBody)

               statusCode = favoritando.status
               message = favoritando.message
            }else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
/****************************************************************
*    Rotas para CRUD (insert) de clientes                       *
*    Data: 11/12/2022                                           *
*****************************************************************/
//EndPoint para inserir um novo cliente
app.post('/v1/cliente', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            
            const controllerCliente = require('../controller/controllerCliente.js')

            const novoCliente = await controllerCliente.novoCliente(dadosBody)
           statusCode = novoCliente.status
           message = novoCliente.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
   

app.listen(1313, function(){
    console.log('Servidor aguardando requisições')
})