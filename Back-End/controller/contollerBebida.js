/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 28/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/
  

const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar uma nova bebida
const novaBebida = async function (bebida){
    if(bebida.nome == '' || bebida.nome == undefined || bebida.valor == '' || bebida.valor == undefined ||
    bebida.foto == '' || bebida.foto == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novaBebida = require('../model/DAO/bebida.js')
        //import da model bebidaMedida (tabela de relação entre bebida e medida)
        const { insertBebidaMedida } = require ('../model/DAO/bebida_medida.js')
        const resultNovaBebida = await novaBebida.insertBebida(bebida)

        if(resultNovaBebida){
            let idNovaBebida = await novaBebida.selectLastId()
            
            if(idNovaBebida > 0){
                let bebidaMedida = {}
                bebidaMedida.id_bebida = idNovaBebida
                for(let i = 0; i < bebida.medida.length; i++){
                    bebidaMedida.id_medida = bebida.medida[i].id_medida
                    const response = await insertBebidaMedida(bebidaMedida)
                     if (response == false) {
                        await deletarBebida(idNovaBebida)
                        return{status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                     }
                }
                return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
                
            }else{
                await deletarBebida(idNovaBebida)
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }


}

//Função para atualizar uma bebida
const atualizarBebida = async function(bebida) {
    if(bebida.id == '' || bebida.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    
        else if(bebida.nome == '' || bebida.nome == undefined || bebida.valor == '' || bebida.valor == undefined ||
            bebida.foto == '' || bebida.foto == undefined)
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarBebida = require('../model/DAO/bebida.js')
           
            const result = await atualizarBebida.updateBebida(bebida)
          
            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}

//Função para excluir uma bebida
const deletarBebida = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const bebida = await buscarBebida(id)
            if(bebida){
                    const excluirBebida = require('../model/DAO/bebida.js')
                    const result = await excluirBebida.deleteBebida(id)

                if (result)

                    return {status:200, message:MESSAGE_SUCESS.DELETE_ITEM}
                else 
                    return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }else{
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
 
    }

}
//Função para retornar todas as bebidas
const listarBebidas = async function() { 

    const{selectBebidaMedida} = require('../model/DAO/bebida_medida.js')

    const dadosBebidas = await selectBebidaMedida()

    if(dadosBebidas){
        return dadosBebidas
    }
    else 
        return false
    
}
//Função para retornar uma pizza baseado no ID
const buscarBebida = async function(id) { 

    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const{selectByIdBebidaMedida} = require('../model/DAO/bebida_medida.js')
        
        const dadosBebida = await selectByIdBebidaMedida(id)
        console.log(dadosBebida);
        return dadosBebida
    }
 
 
    
}

module.exports = {
novaBebida,
atualizarBebida,
deletarBebida,
buscarBebida,
listarBebidas

}