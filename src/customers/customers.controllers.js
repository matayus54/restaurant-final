const address = require('../database/models/init-models').initModels().customer_addresses
const datailsUsers =  require('../database/models/init-models').initModels().customer_details
const uuid = require('uuid')

const addAddress = async (userId, body) =>{
    const id = uuid.v4()
    const newAddres = await address.create({
        uuid: id,
        ...body,
        user_uuid: userId
    })

    return newAddres
}
const getAllUserAdress = async (userId) =>{
    const allAdresses = await address.findAll({
        where:{
            user_uuid: userId
        }
    })
    return allAdresses
}
const getTheAdress = async (addressId) =>{
    const add = address.findOne({
        where:{
            uuid: addressId
        }
    })
    return add
}
const updateAdressUser = async (id, body) =>{
    const updateAdd = await address.update(body,{
        where: { uuid: id }
    })
    return {message: `user ${updateAdd} succsefully update`}
}

const deleteAddressUser = async (id) =>{
    const deleteAdd = await address.destroy({
        where:{
            uuid: id
        }
    })
    return deleteAdd
}

const updateDatiailsUser = async (id, body) =>{
    const updateDetails = await datailsUsers.update(body, {
        where: {user_uuid: id}
    })
    return updateDetails
}
module.exports = {
    addAddress,
    getAllUserAdress,
    getTheAdress,
    updateAdressUser,
    deleteAddressUser,
    updateDatiailsUser
}