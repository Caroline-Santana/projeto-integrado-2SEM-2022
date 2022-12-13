/********************************************************************************************************
 * Objetivo: Implementação do JWT no projeto                                                            *
 * Data criação: 12/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *                                                                                         *                                                                 *
 ********************************************************************************************************/

const jwt =require('jsonwebtoken')
const SECRET = 'la4tezza22'
//Tempo para validar o token do JWT (segundos)
const EXPIRES = 300

const creatJWT = async function(payLoad){
    //Gerando um token
    const token = jwt.sign({userId: payLoad}, SECRET, {expiresIn: EXPIRES})
    return token
}

const validateJWT = async function(token){

    let status
    jwt.verify(token, SECRET, async function(err, decode){

        if(err != null)
            status = false
        else 
            status = true
    })
    return status
}

module.exports = {
    creatJWT,
    validateJWT
}