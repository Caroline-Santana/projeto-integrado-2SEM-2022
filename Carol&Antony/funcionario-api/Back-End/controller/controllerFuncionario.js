/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')


const autenticando = async function (funcionario) {
    if (funcionario.senha == undefined || funcionario.senha == '' || funcionario.login == undefined || funcionario.login == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const{autenticarFunc} = require('../model/DAO/funcionario.js')

    const autenticacao = await autenticarFunc()

    if (autenticacao) {
        return {status: 200, message: MESSAGE_SUCCESS.AUTENTICATE_SUCCESS}
    } else{
        return {status: 404, message: MESSAGE_ERROR.AUTENTICATE_ERROR}
    }
}

module.exports ={
    autenticando
}