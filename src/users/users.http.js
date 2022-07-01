const usersControllers = require('./users.controllers')
const crypto = require('../tools/crypto')
const config = require('../config')

//! todo:
//? get /users ADMIN
//? get /users/:id ADMIN
//? delete /users/me CLIENTE
//? delete /users/:id ADMIN
//? put-patch /users/me CLIENTE USUARIO
//? put-patch /users/:id ADMIN

//! solo administradores
const getAllUsers = async (req, res) => {
    if(!req.user){
        return res.status(401).json({
            status: 401,
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            status: 401,
            message: 'You don`t have clearance to make this request'
        })
    }
    //!/api/v1/users?offset=1&limit=2
    const myOffset = req.query.offset
    const myLimit = req.query.limit 
    
    

    const totalLength = await usersControllers.getAllUsers()


    const users = await usersControllers.getAllUsers({
        limit: myLimit,
        offset: myOffset
    })
    res.status(200).json({_links: {
        "base": `${config.url}${config.port}/api/v1/users`,
        "next": "/page?limit=5&start=5",
        "self": "http://localhost:8080/directors/page"
    }, limit: myLimit,
    size: users.length,
    users: totalLength.length, 
    result: users})
}
//! solo administradores
const getUserById = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const user = await usersControllers.getUserById(req.params.id)
    res.status(200).json(user)
}
//? obtener datos personales de cada usuario
const getMyUser = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const myUser = await usersControllers.getMyPersonalUser(req.user.email)

    if(!myUser){
        return res.status(400).json({message: 'User not find'})
    }
    res.status(200).json(myUser)
}
//! solo administradores
const deleteUser = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const result = await usersControllers.deleteOneUser(req.params.id)
    if(!result){
        return res.status(400).json({message: 'User not exist'})
    }
    res.status(200).json(result)
}
//? delete para todo publicvo de su propoia cuenta OH YEAH
const deleteMeUser = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const result = await usersControllers.deleteOneUser(req.user.id)
    if(!result){
        return res.status(400).json({message: 'User not exist'})
    }
    res.status(200).json(result)
}
//? actualizar para todos los usuarios
const updateMyUser = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }
    if(!req.body.fistname || !req.body.lastname || !req.body.email || !req.body.telephone){
        return res.status(400).json({message: "Missing data"})
    }
    const update = await usersControllers.editUser(req.user.id, req.body)
    if(!update){
        return res.status(400).json({message: "User not found"})
    }
    res.status(200).json(update)
}
const updateMyUserOne = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: "Missing data"})
    }
    if(!req.user){
        return res.status(400).json({message: "Invalid Credentials"})
    }
    const userData =  await usersControllers.getMyPersonalUser(req.user.email)

    if(!userData){
        return res.status(400).json({message: "Invalid Credentials"})
    }
    let data = {
        ...userData,
        ...req.body
    }
    if(req.body.password){
        const hashP = crypto.hashPassword(req.body.password)
        data = {
            ...data,
            password: hashP
        }
    }
    const update = await usersControllers.editUser(req.user.id, data)
    if(!update){
        return res.status(400).json({message: "User not found"})
    }
    res.status(200).json(update)

}
//! actualizar usuarios para admins
const updateUsers = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const Update = await usersControllers.editUser(req.params.id, req.body)
    if(!Update){
        return res.status(400).json({message: "User not found"})
    }
    res.status(200).json(Update)
}
//! solo administrador optener un cliente y su direccion y metodo de pago
const getClient = async (req, res) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const details = await usersControllers.getClientDetails(req.params.uuid)
    if(!details){
        return res.tstaus(400).json({message: "invalid Credentials"})
    }
    res.status(200).json(details)
}


//! solo administradores
const postCumtonDetails = async (req, res) => {
    if(!req.user){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    if(req.user.rol !== 'admin'){
        return res.status(401).json({
            message: 'You don`t have clearance to make this request'
        })
    }
    const  details = await usersControllers.postDetails(req.params.uuid, req.body)
    if(!details){
        return res.status(400).json({message: "Error"})
    }
    res.status(202).json(details)
}
module.exports = {
    getAllUsers,
    getUserById,
    getMyUser,
    deleteUser,
    deleteMeUser,
    updateMyUser,
    updateUsers,
    getClient,
    updateMyUserOne,
    postCumtonDetails
}