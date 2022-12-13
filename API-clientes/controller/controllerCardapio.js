/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')

//Função para retornar todos as pizzas
const listarPizzas = async function() { 

    const{selectAllPizzas} = require('../model/DAO/clientes_cardapio.js')

    const dadosPizzas = await selectAllPizzas()

    if(dadosPizzas){
        return dadosPizzas
    }
    else 
        return false
    
}

//Função para retornar todos as bebidas
const listarBebidas = async function() { 
    const {selectAllBebidas} = require('../model/DAO/clientes_cardapio.js')

    const dadosBebida = await selectAllBebidas()

    if(dadosBebida){
        
        return dadosBebida
    }
    else 
        return false
    
}

//Função para retornar todos as promoções
const listarPromocoes = async function() { 
    const {selectAllPromocoes} = require('../model/DAO/clientes_cardapio.js')

    const dadosPromocoes = await selectAllPromocoes()

    if(dadosPromocoes){
        
        return dadosPromocoes
    }
    else 
        return false
    
}

//Função para retornar a lista das pizzas favoritas
const listarFavs = async function(){
    const{selectFav} = require('../model/DAO/pizza.js')

    const dadosFavoritos = await selectFav()

    if(dadosFavoritos){
        return dadosFavoritos
    }
    else 
        return false
}

//Função responsável por favoritar uma pizza
const favoritando = async function (id){
    const pizza = require('../model/DAO/pizza.js')
    if(id == undefined || id == ''){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    const verificacao = await pizza.selectByIdPizza(id)

    if(verificacao) {
        const add = await pizza.addFav(id, verificacao[0].favoritado)

        if (add){
            return {status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM}
        }else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }else {
        return {status: 400, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}

module.exports= {
listarBebidas,
listarPizzas,
listarPromocoes,
favoritando,
listarFavs
}