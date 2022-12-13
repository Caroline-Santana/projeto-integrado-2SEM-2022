/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD.                                    *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const md5 = require("md5")

const autenticarFunc= async (login, password) => {
    try {
        // console.log(login, password.senha);
        
        
        //ERRO: a senha está retornando indefinida
        const sql = `select id from tbl_funcionario where acesso = '${login}' and senha = md5('${password}');`
        // console.log(sql);
        const result = await prisma.$queryRawUnsafe(sql)
        console.log(result);
        if (result.length > 0) {
            return result
        } else{
            return false
        }
    } catch (err) {
        console.log(err);
    }
}

const insertFun = async (funcionario) => {
    try {  
        let sql = `insert into tbl_funcionario (nome, acesso, senha)
                           values ('${funcionario.nome}', '${funcionario.acesso}', md5('${funcionario.senha}'));`

        

        const result = await prisma.$executeRawUnsafe(sql)
    
        if (result)
            return true
        else 
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
    }
    catch (error) {
        return false
    }
}

module.exports = {
    autenticarFunc,
    insertFun
}