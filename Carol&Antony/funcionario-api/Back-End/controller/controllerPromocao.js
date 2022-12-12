/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                            *
 * Data criação: 09/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar uma nova promocao
const novaPromocao = async function (promocao){
    if(promocao.nome == '' || promocao.nome == undefined || promocao.descricao == '' || promocao.descricao == undefined ||promocao.valor == '' || promocao.valor == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novaPromocao = require('../model/DAO/promocao.js')
        const resultNovaPromocao = await novaPromocao.insertPromocao(promocao)
        if(resultNovaPromocao)
                return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
                
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }

}

//Função para atualizar uma promocao
const atualizarPromocao = async function(promocao) {
    if(promocao.id == '' || promocao.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

       else if(promocao.nome == '' || promocao.nome == undefined|| promocao.descricao == '' || promocao.descricao == undefined || promocao.valor == '' || promocao.valor == undefined || promocao.imagem == '' || promocao.imagem == undefined )
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarPromocao = require('../model/DAO/promocao.js')
           
            const result = await atualizarPromocao.updatePromocao(promocao)
          
            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}

//Função para excluir uma promocao
const deletarPromocao = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const promocao = await buscarPromocao(id)
            if(promocao){
                    const excluirPromacao = require('../model/DAO/promocao.js')
                    const result = await excluirPromacao.deletePromocao(id)
                   
                if (result)
                    
                    return {status:200, message:MESSAGE_SUCESS.DELETE_ITEM}
                else 
                    return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }else{
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
 
    }

}
//Função para retornar todas as promocoes
const listarPromocoes = async function() { 

    const{selectAllPromocoes} = require('../model/DAO/promocao.js')

    const dadosPromocoes = await selectAllPromocoes()

    if(dadosPromocoes){
        return dadosPromocoes
    }
    else 
        return false
    
}
//Função para retornar uma promocao baseado no ID
const buscarPromocao = async function(id) { 

    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const{selectByIdPromocao} = require('../model/DAO/promocao.js')
        
        const dadosPromocao = await selectByIdPromocao(id)
        
        return dadosPromocao
    }
 
    
}

module.exports = {
novaPromocao,
atualizarPromocao,
deletarPromocao,
buscarPromocao,
listarPromocoes

}