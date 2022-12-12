/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 09/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { MESSAGE_ERROR } = require('../../modulo/config.js')

//Função para inserir uma nova bebida no BD
const insertBebida = async function (bebida){

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_bebida (nome, valor)
                           values ('${bebida.nome}', '${bebida.valor}');`

   
        console.log(sql);
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

//Função para atualizar uma bebida no BD
const updateBebida = async  function (bebida){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `update tbl_bebida set 
       nome         = '${bebida.nome}', 
       valor        = '${bebida.valor}'

       where id = '${bebida.id}'
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
const selectAllBebidas = async function (){

   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   const rsBebidas = await prisma.$queryRaw `select tbl_bebida.id as idBebida, tbl_bebida.nome as nomeBebida, tbl_bebida.valor as valorbebida,
    tbl_medida.medida as medidaBebida, tbl_medida.id as idMedida
   from tbl_bebbida 
       inner join tbl_bebida_medida
           on tbl_bebida_medida.id_bebida = tbl_bebida.id
       inner join tbl_medida
           on tbl_medida.id = tbl_bebida_medida.id_medida;
             order by id desc`
   
   if (rsBebidas.length > 0 )
       return rsBebidas
   else
       return false
}
//Função para excluir uma bebida no BD
const deleteBebida = async function (id){
   try {  
       const {PrismaClient} = require('@prisma/client')
       const prisma = new PrismaClient()
       let sql = `delete from tbl_bebida
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
const selectBebidaById = async function (id){
   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   let sql = `select nome, round (valor,3) as valor from tbl_bebida 
   where id= ${id};`
   const rsBebida = await prisma.$queryRawUnsafe(sql) 

   if (rsBebida.length > 0 )
       return rsBebida
   else
       return false
}
// Função para retornar o último Id gerado no BD
const selectLastId = async function (){
   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   let sql = `select id 
             from tbl_bebida
              order by id desc 
              limit 1;`
   const rsBebida = await prisma.$queryRawUnsafe(sql)

   if(rsBebida)
       return rsBebida[0].id
   else
       return false
}
module.exports = {
insertBebida,
updateBebida,
deleteBebida,
selectBebidaById,
selectAllBebidas,
selectLastId
 
}