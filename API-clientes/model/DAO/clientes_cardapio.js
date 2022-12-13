/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (select).                           *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

const { MESSAGE_ERROR } = require('../../modulo/config.js')

//Listando os todos os produtos, promoções e pizzas favoritas

const selectAllPizzas = async function (){

   const {PrismaClient} = require('@prisma/client')
   const prisma = new PrismaClient()

   const rsPizza = await prisma.$queryRaw `select tbl_pizza.nome as nomePizza, tbl_pizza.descricao as descricaoPizza, tbl_pizza.valor as valorPizza, 
   tbl_tamanho_pizza.tamanho as tamanhoPizza
   from tbl_pizza 
       inner join tbl_pizza_tamanho_pizza
           on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
       inner join tbl_tamanho_pizza
           on tbl_tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho_pizzas`
   
   if (rsPizza.length > 0 )
       return rsPizza
   else
       return false
}

const selectAllBebidas = async function(){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_bebida.nome as nomeBebida, tbl_bebida.valor as valorBebida,
    tbl_medida.medida as medidaBebida
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

const selectAllPromocoes = async function (){

    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()
 
    const rsPromocoes = await prisma.$queryRaw `select * from tbl_promocao`
    
    if (rsPromocoes.length > 0 )
        return rsPromocoes
    else
        return false
}


 //Função para inserir um novo cliente no BD
 const insertCliente = async function (cliente) {
 
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_contato_cliente (nome, telefone, celular, email, mensagem, id_tipo_mensagem)
                           values ('${cliente.nome}', '${cliente.telefone}', '${cliente.celular}', '${cliente.email}', '${cliente.mensagem}' , '${cliente.id_tipo_mensagem}');`


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

//Função para retornar as pizzas favoritas
const selectFav = async function (){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    const sql =  `select tbl_pizza.nome, tbl_pizza.valor, tbl_pizza.descricao,tbl_pizza.favoritado, tbl_tamanho_pizza.tamanho
    from tbl_pizza
        inner join tbl_pizza_tamanho_pizza on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
        inner join tbl_tamanho_pizza on tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho
    where tbl_pizza.favoritado > 0 order by tbl_pizza.favoritado desc limit 10`

    const rsFavs = await prisma.$queryRawUnsafe(sql)

    if(rsFavs.lenght > 0){
        return rsFavs
    }else {
        return false
    }
}

//Favoritando uma pizza
const addFav = async function (id, fav) {

        const sql = `update tbl_pizza set favoritado = ${fav + 1} where id = ${id}`
        const result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
}

 

module.exports = {
 selectAllPizzas,
 selectAllBebidas,
 selectAllPromocoes,
 insertCliente,
 selectFav,
 addFav
}