const crypto = require('../tools/crypto');
const uuid = require('uuid');
const users = require('../database/models/init-models').initModels().users;
const roles = require('../database/models/init-models').initModels().roles
const token = require('../tools/generateToken')
const verifyTokens = require('../database/models/init-models').initModels().verify_tokens

const getMyUserByEmail = async (email) => {
    const myUser = await users.findOne({
        where:{
            email
        }
    })
    return myUser
}

const myRol = async (id) =>{
    const myR = await roles.findOne({
        where:{
            id
        }
    })
    return myR
}

//Cualquier usuario
const registerUser = async (data) => {
    // todo: La contraseña tiene que estar encriptada con bcrypt
    const hashedPassword = crypto.hashPassword(data.password);
    const userId = uuid.v4();
    const newUser = await users.create({
        uuid: userId,
        ...data,
        password: hashedPassword,
        role_id: 1
    })

    return {
        message: `User created succesfully with the id: ${userId}`,
        user: newUser,
    };
}

const createdToken = async (userId) =>{
    const newToken = await verifyTokens.create({
        token: token.generateToken(),
        user_id: userId,
        used: false
    })
    return newToken
}

const verificationAllUser = async (data) =>{
    const token = data.token
    const userId = data.user_id

    const user = await users.findOne({
        where: {
            uuid: userId
        }
    })
    const verifyUser = await users.update({...user, verified: true},{
        where: {
            uuid: userId
        }
    })
    const verifyToken = await verifyTokens.findOne({
        where: {
            token
        }
    })

    const allOkey = await verifyTokens.update({...verifyToken, used: true},{
        where: {
            token: token
        }
    })
    const response = {
        user: verifyUser,
        resolveToken: allOkey
    }

    return response
}
module.exports = {
    getMyUserByEmail,
    myRol,
    registerUser,
    createdToken,
    verificationAllUser
}