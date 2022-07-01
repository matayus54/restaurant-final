const controllers = require('./auth.controllers')
const jwt = require('jsonwebtoken')
const toPromise = require('../tools/toPromise').toPromise
const config = require('../config')
const crypto = require('../tools/crypto')
const Schemeas = require('../tools/verify')

const loginUser = async (req, res) =>{
    const data = Schemeas.loginSchema.validate(req.body)
    if(data.error){
        return res.status(400).json({message: data.error.details[0].message})
    }
    const [myUser, err] = await toPromise(controllers.getMyUserByEmail(req.body.email))
    if(err || !myUser){
        return res.status(400).json({message: 'Invalid Credential'})
    }
    const verification = crypto.comparePassword(req.body.password, myUser.password)
    if(!verification){
        return res.status(400).json({message: 'Invalid Credential'})
    }
    const myRol = await controllers.myRol(myUser.role_id)
    if(!myRol){
        return res.status(400).json({message: 'Invalid Credential'})
    }
    const token = jwt.sign({
        id: myUser.uuid,
        email: req.body.email,
        rol: myRol.name
    }, config.jwtSecret)

    res.status(200).json({token: token})
}
//? registrar para todos los usuarios
const registerUser = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: "Missing data"})
    }
    const newUser =  await controllers.registerUser(req.body)
    if(!newUser){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json(newUser)
}

//todo
// ? Crear una funcion que tome como argumento el token y
// ? genere una url como la siguiente:
// ! /auth/verify-account?token=fbdsfdfpoi&user_id=2


const generateUrl = (token,  userid) =>{
    return `${config.url}/auth/verify-account?token=${token}&user_id=${userid}`
}

const generateVerifyToken = async (req, res) =>{
    if(!req.user){
        res.status(400).json({message: 'Error'})
    }
    const id = req.user.id
    const token = await controllers.createdToken(id)
    res.status(200).json({
        url: generateUrl(token.token, id),
        message: "Confirm your acount in the ext url"
    })
}

const verifyAccount = async (req, res) =>{
    if(!req.query){
        return res.status(400).json({message: "Missing data"})
    }else if(!req.query.token){
        return res.status(400).json({message: "Missing data"})
    }else{
        //? Verificar mi cuenta de usuario
        //todo crear ambos controladores para modificar la tabla de usuarios a verificado:true
        //todo y la tabla de verify_tokens a used: true
        //? Esta ruta no esta protegida, todo es a base del req.query
        //todo crear las rutas necesarias para verificar la cuenta
        const verify = await controllers.verificationAllUser(req.query)
        res.status(200).json({
            message: "User Verify Correctly",
            verify
        })
    }
}

module.exports = {
    loginUser,
    registerUser,
    generateVerifyToken,
    verifyAccount
}