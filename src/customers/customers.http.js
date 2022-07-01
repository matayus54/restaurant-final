const controllers = require('./customers.controllers')
const crypto = require('../tools/crypto')
const config = require('../config')
//! Todas son solo de administradores 
const postCustomAdress = async (req, res) =>{
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
    if(!req.body){
        return res.status(400).json({
            message: 'Missing Data'
        })
    }

    const newCustom = await controllers.addAddress(req.params.uuid, req.body)

    if(!newCustom){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json(newCustom)
}
const getUserAdress = async (req, res) =>{
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

    const AllAddress = await controllers.getAllUserAdress(req.params.uuid)

    if(!AllAddress){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(201).json(AllAddress)
}
const getOneAdress = async (req, res) => {
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
    const address = await controllers.getTheAdress(req.params.Cuuid)
    if(!address){
        return res.status(400).json({message: "Internal Error"})
    }
    res.status(200).json(address)
}
const updateAddress = async (req, res) =>{
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
    if(!req.body){
        return res.status(401).json({
            message: 'Missing data'
        })
    }
    const update = await controllers.updateAdressUser(req.params.Cuuid, req.body)
    if(!update){
        return res.status(401).json({
            message: 'YMissing data'
        })
    }
    res.status(202).json(update)
}
const deleteAddress = async (req, res) =>{
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
    const deleteAdd = await controllers.deleteAddressUser(req.params.Cuuid)
    if(!deleteAdd){
        return res.status(400).json({message: "error of delete"})
    }
    res.status(200).json({message: "Delete Address succesfully"})
}

const updateDatils = async (req, res) =>{
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
    const update = await controllers.updateDatiailsUser(req.params.uuid, req.body)
    if(!update){
        return res.status(400).json({message: "Erro to update"})
    }
    return res.status(201).json({message: "User update"})
}
module.exports = {
    postCustomAdress,
    getUserAdress,
    getOneAdress,
    updateAddress,
    deleteAddress,
    updateDatils
}