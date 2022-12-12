/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 12/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')

 //Função para retornar todas as mensagens
const listarMensagens = async function() { 

    const{selectAllMensagens} = require('../model/DAO/mensagemClientes.js')

    const dadosMensagens = await selectAllMensagens()

    if(dadosMensagens){
        return dadosMensagens
    }
    else 
        return false
    
}

module.exports = {
    listarMensagens
}