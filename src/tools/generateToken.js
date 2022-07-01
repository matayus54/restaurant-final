const generateToken = () => {
    // ? Crear una funcion que genere un token alfanumerico
    // ? aleatorio de 8 caracteres
    return Math.random().toString(36).substring(2);
};
module.exports = {
    generateToken,
};