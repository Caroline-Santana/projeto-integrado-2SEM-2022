/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 11/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')

//Função para gerar um novo cliente
const novoCliente = async function (cliente){
    if(cliente.nome == '' || cliente.nome == undefined || cliente.celular == '' || cliente.celular == undefined  
    || cliente.mensagem == '' ||cliente.mensagem == undefined || cliente.id_tipo_mensagem == ''||
     cliente.id_tipo_mensagem == undefined){
        
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novoCliente = require('../model/DAO/clientes&cardapio.js')
       
        const resultNovoCliente = await novoCliente.insertCliente(cliente)

        if(resultNovoCliente)
          
            return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
        
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }

}



module.exports = {
    novoCliente,

}