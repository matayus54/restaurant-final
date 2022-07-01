const router = require('express').Router();
const customHttp = require('./customers.http')
const passport = require('passport');
require('../tools/auth')(passport)

router.route('/:uuid')
    .put(passport.authenticate('jwt', {session: false}), customHttp.updateDatils)
 
router.route('/:uuid/address')
    .get(passport.authenticate('jwt', {session: false}), customHttp.getUserAdress)
    .post(passport.authenticate('jwt', {session: false}), customHttp.postCustomAdress)

router.route('/:uuid/address/:Cuuid')
    .get(passport.authenticate('jwt', {session: false}), customHttp.getOneAdress)
    .put(passport.authenticate('jwt', {session: false}), customHttp.updateAddress)
    .delete(passport.authenticate('jwt', {session: false}), customHttp.deleteAddress)

module.exports = {
    router
}