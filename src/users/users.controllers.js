const users = require('../database/models/init-models').initModels().users;
const details = require('../database/models/init-models').initModels().customer_details
const addressDetails = require('../database/models/init-models').initModels().customer_addresses
const uuid = require('uuid')
//Solo administradores
const getAllUsers = async (params) => {
    if(params){
        const allUsers = await users.findAll({...params , 
            attributes : {
                exclude: ["password"]
            }
        })
         return allUsers
    }else{
        const allUsers = await users.findAll({
            attributes : {
                exclude: ["password"]
            }
        })
        return allUsers
    }
    
}

//Solo administradores
const getUserById = async (uuid) => {
    const user = await users.findByPk(uuid, {
        attributes : {
            exclude: ["password"]
        }
    })
    return user
}
const getMyPersonalUser = async (email) =>{
    const myPeUser = await users.findOne({
        where:{
            email
        }
    })
    return myPeUser
}



//clientes y administradores
const deleteOneUser = async(id) => {
    const erased = await users.destroy({
        where: {
            uuid: id
        }
    })
    if(!erased){
        return null
    }
    return {
        message: `User with id: ${id} deleted succesfully.`
    }
}

// cualquier rol
const editUser = async (id, data) => {
    const user = await users.update(data,{
        where: {
            uuid: id
        }
    })
    return {
        message: `User with id: ${id} eddited succesfully.`,
        user: user
    }
}

const postDetails = async (id, body)=>{
    const detailsId = uuid.v4()
    const customDetails = await details.create({
        uuid: detailsId,
        ...body,
        user_uuid: id
    })
    return customDetails
}

const getClientDetails = async (id) =>{
    const detailsCustomer  = await details.findOne({
        where:{
            user_uuid: id
        },
        include: [
            {
                model: addressDetails,
                as: "default_address_uu"
            }
        ]
    })
    return detailsCustomer 
}

// todo:
// ? Crear una funcion que genere un token alfanumerico aleatorio de 8 caracteres
// ? Generar un nuevo token y agregar un nuevo registro a la tabla de verify_tokens, 
//?  con el userId para enlazar el token


module.exports = {
    getAllUsers,
    getUserById,
    deleteOneUser,
    editUser,
    getMyPersonalUser,
    postDetails,
    getClientDetails
}