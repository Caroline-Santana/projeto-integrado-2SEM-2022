/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 01/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

//Função para inserir um novo registro no BD
const insertPizzaTamanho = async function (pizzaTamanho) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_pizza_tamanho_pizza (id_pizza, id_tamanho_pizzas)
                    values ('${pizzaTamanho.id_pizza}','${pizzaTamanho.id_tamanho_pizzas}')`

                  
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

//Função para buscar os dados de um tamanho referente a uma pizza
const selectPizzaTamanhoById = async function(idPizza){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.nome as nomePizza, tbl_pizza.descricao as descricaoPizza, tbl_pizza.valor as valorPizza, 
    tbl_tamanho_pizza.id as IdTamanho, tbl_tamanho_pizza.tamanho as Tamanho 
    from tbl_pizza 
        inner join tbl_pizza_tamanho_pizza
            on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
        inner join tbl_tamanho_pizza
            on tbl_tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho_pizzas
              where tbl_pizza.id = ${idPizza};`

        const rsPizzaTamanho = await prisma.$queryRawUnsafe(sql)

        console.log(rsPizzaTamanho);
            if (rsPizzaTamanho)
                return rsPizzaTamanho
            else
                return false
} 

const selectPizzaTamanho = async function(){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.id as IdPizza, tbl_pizza.nome as nomePizza, tbl_pizza.descricao as descricaoPizza, tbl_pizza.valor as valorPizza, 
    tbl_tamanho_pizza.tamanho as tamanhoPizza, tbl_tamanho_pizza.id as idTamanho
    from tbl_pizza 
        inner join tbl_pizza_tamanho_pizza
            on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
        inner join tbl_tamanho_pizza
            on tbl_tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho_pizzas`

        
        const rsPizzaTamanho = await prisma.$queryRawUnsafe(sql)
        
            if (rsPizzaTamanho)
                return rsPizzaTamanho
            else
                return false
} 




module.exports = {
    insertPizzaTamanho,
    selectPizzaTamanho,
    selectPizzaTamanhoById,

}



// `select tbl_ingrediente.id as id_ingrediente, tbl_ingrediente.nome as nome_ingrediente, 
//     tbl_pizza.id as id_pizza
// from tbl_pizza
//   inner join tbl_pizza_ingrediente
//       on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
//   inner join tbl_ingrediente
//       on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
// where id_pizza = ${idPizza} ;`