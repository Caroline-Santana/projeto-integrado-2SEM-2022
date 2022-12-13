/********************************************************************************************************
 * Objetivo:API responsável pela manipulação de dados do Back-End                                       *
 *           (GET, POST, PUT, DELETE)                                                                   *
 * Data criação: 28/11/2022                                                                             *
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
*    Rotas para autenticar login                                *
*    Data: 10/12/2022                                           *
*****************************************************************/
const verifyJWT = async function (request, response, next){
    const jwt = require('../middleware/middlewareJWT.js')
    let token = request.headers['x-access-token']

    const autenticidadeToken = await jwt.validateJWT(token)
    if (autenticidadeToken)
            next()
    else 
        return response.status(401).end()
    
}
app.post('/v1/funcionario/login', cors(), jsonParser, async (request, response, next) => {
 
    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const controllerFuncionario = require('../controller/controllerFuncionario.js')

            console.log(dadosBody);
           
            const dadosFuncionario = await controllerFuncionario.autenticando(dadosBody.acesso, dadosBody.senha)
       
            statusCode = 200
            message = dadosFuncionario

        } else{
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
app.post('/v1/funcionario', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            //import do arquivo da controller de pizza
            const controllerFuncionario = require('../controller/controllerFuncionario.js')

            //Chama a função novaPizza da controller e encaminha os dados do body
            const novoFuncionario = await controllerFuncionario.novoFuncionario(dadosBody)
           statusCode = novoFuncionario.status
           message = novoFuncionario.message
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
*    Rotas para CRUD (creat, read, update e delete) de pizzas   *
*    Data: 28/11/2022                                           *
*****************************************************************/

//EndPoint para inserir uma nova pizza
app.post('/v1/pizza', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            //import do arquivo da controller de pizza
            const controllerPizza = require('../controller/controllerPizza.js')

            //Chama a função novaPizza da controller e encaminha os dados do body
            const novaPizza = await controllerPizza.novaPizza(dadosBody)
           statusCode = novaPizza.status
           message = novaPizza.message
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
//EndPoint para atualizar uma pizza existente
app.put('/v1/pizza/:id', cors(), jsonParser, async function (request, response){
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

                const controllerPizza = require('../controller/controllerPizza.js')
                const atualizarPizza = await controllerPizza.atualizarPizza(dadosBody)

               statusCode = atualizarPizza.status
               message = atualizarPizza.message
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
//EndPoint para listar todas as pizzas
app.get('/v1/pizzas', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerPizza= require('../controller/controllerPizza.js')
    
    
    const dadosPizza = await controllerPizza.listarPizzas()

 
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
//EndPoint para deletar uma pizza existente
app.delete('/v1/pizza/:id',verifyJWT, cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerPizza= require('../controller/controllerPizza.js')
            const deletarPizza = await controllerPizza.deletarPizza(id)
            statusCode = deletarPizza.status
            message = deletarPizza.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})
//EndPoint para buscar uma pizza pelo id
app.get('/v1/pizza/:id',verifyJWT, cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerPizza = require('../controller/controllerPizza.js')
    const dadosPizza = await controllerPizza.buscarPizza(id)
        if(id != '' && id != undefined){
            if(dadosPizza){
                statusCode = 200
                message = dadosPizza
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


/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de tamanhos    *
* Data: 07/12/2022                                              *
*****************************************************************/
//EndPoint para inserir um novo tamanho
app.post('/v1/tamanho',cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerTamanho = require('../controller/controllerTamanhoPizza.js')

            const novoTamanho = await controllerTamanho.novoTamanho(dadosBody)
           statusCode = novoTamanho.status
           message = novoTamanho.message
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
//EndPoint para atualizar um tamanho existente
app.put('/v1/tamanho/:id', cors(), jsonParser, async function (request, response){
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

                const controllerTamanho = require('../controller/controllerTamanhoPizza.js')
                const atualizarTamanho = await controllerTamanho.atualizarTamanho(dadosBody)

               statusCode = atualizarTamanho.status
               message = atualizarTamanho.message
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
//EndPoint para buscar um tamanho pelo id
app.get('/v1/tamanho/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerTamanho = require('../controller/controllerTamanhoPizza.js')
    const dadosTamanho = await controllerTamanho.buscarTamanho(id)
        if(id != '' && id != undefined){
            if(dadosTamanho){
                statusCode = 200
                message = dadosTamanho
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
//EndPoint para listar todos os tamanhos
app.get('/v1/tamanhos', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerTamanhos= require('../controller/controllerTamanhoPizza.js')
    
    
    const dadosTamanhos = await controllerTamanhos.listarTamanhos()

 
    if(dadosTamanhos){
        statusCode = 200
        message = dadosTamanhos
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para deletar um tamanho existente
app.delete('/v1/tamanho/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerTamanho = require('../controller/controllerTamanhoPizza.js')
            const deletarTamanho = await controllerTamanho.deletarTamanho(id)
            statusCode = deletarTamanho.status
            message = deletarTamanho.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de bebidas     *
* Data: 07/12/2022                                              *
*****************************************************************/
//EndPoint para inserir uma nova bebida
app.post('/v1/bebida',verifyJWT, cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerBebida = require('../controller/contollerBebida.js')

            const novaBebida = await controllerBebida.novaBebida(dadosBody)
           statusCode = novaBebida.status
           message = novaBebida.message
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
//EndPoint para atualizar uma bebida existente
app.put('/v1/bebida/:id',verifyJWT, cors(), jsonParser, async function (request, response){
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

                const controllerBebida = require('../controller/contollerBebida.js')
                const atualizarBebida  = await controllerBebida.atualizarBebida(dadosBody)

               statusCode = atualizarBebida.status
               message = atualizarBebida.message
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
//EndPoint para buscar uma bebida pelo id
app.get('/v1/bebida/:id',verifyJWT, cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerBebida  = require('../controller/contollerBebida.js')
    const dadosBebida  = await controllerBebida.buscarBebida(id)
        if(id != '' && id != undefined){
            if(dadosBebida){
                statusCode = 200
                message = dadosBebida
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
//EndPoint para listar todos as bebidas
app.get('/v1/bebidas',verifyJWT, cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerBebidas  = require('../controller/contollerBebida.js')
    
    
    const dadosBebidas = await controllerBebidas.listarBebidas()

 
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
//EndPoint para deletar uma bebida existente
app.delete('/v1/bebida/:id' ,verifyJWT, cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerBebida  = require('../controller/contollerBebida.js')
            const deletarBebida = await controllerBebida.deletarBebida(id)
            statusCode = deletarBebida.status
            message = deletarBebida.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de medidas     *
* Data: 07/12/2022                                              *
*****************************************************************/
//EndPoint para inserir uma nova medida
app.post('/v1/medida', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerMedida = require('../controller/controllerMedida.js')

            const novaMedida = await controllerMedida.novaMedida(dadosBody)
           statusCode = novaMedida.status
           message = novaMedida.message
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
//EndPoint para atualizar uma medida existente
app.put('/v1/medida/:id', cors(), jsonParser, async function (request, response){
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

                const controllerMedida = require('../controller/controllerMedida.js')
                const atualizarMedida  = await controllerMedida.atualizarMedida(dadosBody)

               statusCode = atualizarMedida.status
               message = atualizarMedida.message
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
//EndPoint para buscar uma medida pelo id
app.get('/v1/medida/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerMedida  = require('../controller/controllerMedida.js')
    const dadosMedida  = await controllerMedida.buscarMedida(id)
        if(id != '' && id != undefined){
            if(dadosMedida){
                statusCode = 200
                message = dadosMedida
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
//EndPoint para listar todos as medida
app.get('/v1/medidas', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerMedidas  = require('../controller/controllerMedida.js')
    
    
    const dadosMedidas = await controllerMedidas.listarMedidas()

 
    if(dadosMedidas){
        statusCode = 200
        message = dadosMedidas
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para deletar uma medida existente
app.delete('/v1/medida/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerMedida  = require('../controller/controllerMedida.js')
            const deletarMedida = await controllerMedida.deletarMedida(id)
            statusCode = deletarMedida.status
            message = deletarMedida.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de promocao    *
* Data: 09/12/2022                                              *
*****************************************************************/

//EndPoint para inserir uma nova promocao
app.post('/v1/promocao', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerPromocao = require('../controller/controllerPromocao.js')

            const novaPromocao = await controllerPromocao.novaPromocao(dadosBody)
           statusCode = novaPromocao.status
           message = novaPromocao.message
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
//EndPoint para atualizar uma promocao existente
app.put('/v1/promocao/:id', cors(), jsonParser, async function (request, response){
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

                const controllerPromocao = require('../controller/controllerPromocao.js')
                const atualizarPromocao  = await controllerPromocao.atualizarPromocao(dadosBody)

               statusCode = atualizarPromocao.status
               message = atualizarPromocao.message
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
//EndPoint para buscar uma promocao pelo id
app.get('/v1/promocao/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerPromocao  = require('../controller/controllerPromocao.js')
    const dadosPromocao  = await controllerPromocao.buscarPromocao(id)
        if(id != '' && id != undefined){
            if(dadosPromocao){
                statusCode = 200
                message = dadosPromocao
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
//EndPoint para listar todos as promocoes
app.get('/.netlify/functions/api/v1/promocoes', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerPromocoes  = require('../controller/controllerPromocao.js')
    
    
    const dadosPromocoes = await controllerPromocoes.listarPromocoes()

 
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
//EndPoint para deletar uma promocao existente
app.delete('/v1/promocao/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerPromocao  = require('../controller/controllerPromocao.js')
            const deletarPromocao = await controllerPromocao.deletarPromocao(id)
            statusCode = deletarPromocao.status
            message = deletarPromocao.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

// app.listen(1313, function(){
//     console.log('Servidor aguardando requisições')
// })

module.exports = app