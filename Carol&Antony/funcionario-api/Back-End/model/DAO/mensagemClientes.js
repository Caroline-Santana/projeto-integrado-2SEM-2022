/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (select).                           *
 * Data criação: 12/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { MESSAGE_ERROR } = require('../../modulo/config.js')

 const selectAllMensagens = async function (){

    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsMensagem = await prisma.$queryRaw `select nome, celular, mensagem, id_tipo_mensagem from tbl_contato_cliente order by id desc`
    
    if (rsMensagem.length > 0 )
        return rsMensagem
    else
        return false
}

module.exports ={
    selectAllMensagens
}