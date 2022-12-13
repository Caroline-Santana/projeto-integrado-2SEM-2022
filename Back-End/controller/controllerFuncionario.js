/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')


const autenticando = async function (login, password) {

    const funcionario = require ('../model/DAO/funcionario.js')
    const jwt = require('../middleware/middlewareJWT.js')

    console.log(password);
    
    const dadosFuncionario = await funcionario.autenticarFunc(login, password)
    
    if (dadosFuncionario) {
        let tokenUser = await jwt.creatJWT(dadosFuncionario.id)
        dadosFuncionario[0].token = tokenUser
        
        return dadosFuncionario
    } else{
        return {status: 404, message: MESSAGE_ERROR.AUTENTICATE_ERROR}
    }
}

const  novoFuncionario = async function(funcionario) {
    if(funcionario.acesso == '' || funcionario.acesso == undefined || funcionario.senha == '' || funcionario.senha == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novoFuncionario = require('../model/DAO/funcionario.js')
    
        const resultNovoFuncionario = await novoFuncionario.insertFun(funcionario)

        if(resultNovoFuncionario){
           
                return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
                
        }
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

module.exports ={
    autenticando,
    novoFuncionario
}