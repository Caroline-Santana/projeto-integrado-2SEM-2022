/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 09/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

//Função para inserir um novo registro no BD
const insertBebidaMedida = async function (bebidaMedida) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_bebida_medida (id_bebida, id_medida)
                    values ('${bebidaMedida.id_bebida}','${bebidaMedida.id_medida}')`
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

//Função para buscar os dados de uma medida referente a uma bebida
const selectByIdBebidaMedida = async function(idBebida){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_bebida.nome as nomeBebida, tbl_bebida.valor as valorBebida, tbl_bebida.foto as fotoBebida, 
    tbl_medida.id as IdMedida, tbl_medida.medida as Medida 
    from tbl_bebida 
        inner join tbl_bebida_medida
            on tbl_bebida_medida.id_bebida = tbl_bebida.id
        inner join tbl_medida
            on tbl_bebida_medida.id_medida = tbl_medida.id
              where tbl_bebida.id = ${idBebida};`


        const rsBebidaMedida = await prisma.$queryRawUnsafe(sql)

        
            if (rsBebidaMedida)
                return rsBebidaMedida
            else
                return false
} 

const selectBebidaMedida = async function(){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_bebida.nome as nomeBebida, tbl_bebida.valor as valorBebida, tbl_bebida.foto as fotoBebida, 
    tbl_medida.medida as medidaBebida, tbl_medida.id as idMedida
    from tbl_bebida 
        inner join tbl_bebida_medida
            on tbl_bebida_medida.id_bebida = tbl_bebida.id
        inner join tbl_medida
            on tbl_medida.id = tbl_bebida_medida.id_medida`

        
        const rsBebidaMedida = await prisma.$queryRawUnsafe(sql)
        
            if (rsBebidaMedida)
                return rsBebidaMedida
            else
                return false
} 
//Função para excluir uma bebia na tabela intermediaria no BD
/*const delete = async function (id){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `delete from tbl_pizza_tamanho_pizza
                        where id = '${id}'
                    `
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
*/

module.exports = {
    insertBebidaMedida,
    selectBebidaMedida,
    selectByIdBebidaMedida
}