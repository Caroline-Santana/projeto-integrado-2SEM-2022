/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD.                                    *
 * Data criação: 10/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/



const autenticarFunc= async (funcionario) => {

    const sql = `select * from tbl_funcionario where  login = '${funcionario.login} and senha = md5('${funcionario.senha}')'`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result.length > 0) {
        return true
    } else{
        return false
    }
}

module.exports = {
    autenticarFunc
}