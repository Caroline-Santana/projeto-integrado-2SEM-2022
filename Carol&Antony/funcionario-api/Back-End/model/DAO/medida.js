/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { MESSAGE_ERROR } = require('../../modulo/config.js')

//Função para inserir uma nova medida de pizza no BD
const insertMedida = async function (medidaBebida) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_medida (medida)
                           values ('${medidaBebida.medida}')`
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
//Função para atualizar uma medida de bebida
const updateMedida = async  function (medidaBebida){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `update tbl_medida set 
                       medida            = '${medidaBebida.medida}'

                       where id = '${medidaBebida.id}'
                   `
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
//Função para retornar apenas o registro baseado no ID
const selectByIdMedida = async function (id){
   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   let sql = `select medida from tbl_medida 
   where id= ${id};`
   const rsMedida = await prisma.$queryRawUnsafe(sql) 
   
   if (rsMedida.length > 0 )
       return rsMedida
   else
       return false
}
//Função para retornar todos os registros do BD
const selectAllMedidas = async function (){

   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   const rsMedida = await prisma.$queryRaw `select medida, id from tbl_medida order by id desc`
   
   if (rsMedida.length > 0 )
       return rsMedida
   else
       return false
}
//Função para excluir uma medida no BD
const deleteMedida = async function (id){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `delete from tbl_medida
                       where id = '${id}'
                   `

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
 insertMedida,
 updateMedida,
 selectAllMedidas,
 selectByIdMedida,
 deleteMedida
}