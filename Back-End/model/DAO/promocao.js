/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 09/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { MESSAGE_ERROR } = require('../../modulo/config.js')

//Função para inserir uma nova promocao no BD
const insertPromocao = async function (promocao) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_promocao (nome, descricao, valor, imagem)
                           values ('${promocao.nome}', '${promocao.descricao}', '${promocao.valor}', '${promocao.imagem}');`

        console.log(sql)

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

//Função para atualizar uma promocao no BD
const updatePromocao = async  function (promocao){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `update tbl_promocao set 
       nome         = '${promocao.nome}', 
       descricao    = '${promocao.descricao}',
       valor        = '${promocao.valor}',
       imagem       = '${promocao.imagem}'

       where id = '${promocao.id}'
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

//Função para retornar todos os registros do BD
const selectAllPromocoes = async function (){

   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   const rsPromocoes = await prisma.$queryRaw `select * from tbl_promocao`
   
   if (rsPromocoes.length > 0 )
       return rsPromocoes
   else
       return false
}
//Função para excluir uma promocao no BD
const deletePromocao = async function (id){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `delete from tbl_promocao
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
//Função para retornar apenas o registro baseado no ID
const selectByIdPromocao = async function (id){
   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   let sql = `select nome, descricao, round (valor,3) as valor, imagem from tbl_promocao 
   where id= ${id};`
   const rsPromocao = await prisma.$queryRawUnsafe(sql) 
   
   if (rsPromocao.length > 0 )
       return rsPromocao
   else
       return false
}
// Função para retornar o último Id gerado no BD
const selectLastId = async function (){
   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   let sql = `select id 
             from tbl_promocao
              order by id desc 
              limit 1;`
   const rsPromocao = await prisma.$queryRawUnsafe(sql)

   if(rsPromocao)
       return rsPromocao[0].id
   else
       return false
}
module.exports = {
insertPromocao,
updatePromocao,
deletePromocao,
selectByIdPromocao,
selectAllPromocoes,
selectLastId
 
}