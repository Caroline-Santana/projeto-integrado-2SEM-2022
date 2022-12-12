/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar uma nova medida
const novaMedida = async function (medidaBebida){
    if(medidaBebida.medida == '' || medidaBebida.medida == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novaMedida = require('../model/DAO/medida.js')
        const result = await novaMedida.insertMedida(medidaBebida)
        if (result)
            return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
 

}
//Função para atualizar uma medida
const atualizarMedida = async function(medidaBebida) {
    if(medidaBebida.id == '' || medidaBebida.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

       else if(medidaBebida.medida == '' || medidaBebida.medida == undefined)
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarMedida= require('../model/DAO/medida.js')
           
            const result = await atualizarMedida.updateMedida(medidaBebida)
        
            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}
//Função para retornar uma medida baseado no ID
const buscarMedida = async function(id) { 

    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const {selectByIdMedida} = require('../model/DAO/medida.js')
        const dadosMedida = await selectByIdMedida(id)
        
        if(dadosMedida){
            return dadosMedida
        }
        else 
            return false
    }
 
    
}
//Função para retornar todos as medidas
const listarMedidas = async function() { 
    const {selectAllMedidas} = require('../model/DAO/medida.js')

    const dadosMedida = await selectAllMedidas()

    if(dadosMedida){
        
        return dadosMedida
    }
    else 
        return false
    
}
//Função para excluir uma medida
const deletarMedida = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const medida = await buscarMedida(id)
            if(medida){
                    const excluirMedida = require('../model/DAO/medida.js')
                    const result = await excluirMedida.deleteMedida(id)
                if (result)
                    return {status:200, message:MESSAGE_SUCESS.DELETE_ITEM}
                else 
                    return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }else{
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
 
    }

}

module.exports= {
novaMedida,
listarMedidas,
deletarMedida,
atualizarMedida,
buscarMedida
}