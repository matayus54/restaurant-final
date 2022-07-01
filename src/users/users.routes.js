const router = require('express').Router();
const userHttp = require('./users.http')
const passport = require('passport');
require('../tools/auth')(passport)

 
router.route('/')
    .get(passport.authenticate('jwt', {session: false}) ,userHttp.getAllUsers)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}),  userHttp.getMyUser)
    .put(passport.authenticate('jwt', {session: false}), userHttp.updateMyUser)
    .patch(passport.authenticate('jwt', {session: false}), userHttp.updateMyUserOne)  
    .delete(passport.authenticate('jwt', {session: false}), userHttp.deleteMeUser)


router.route('/:id') 
    .get(passport.authenticate('jwt', {session: false}) ,userHttp.getUserById)
    .put(passport.authenticate('jwt', {session: false}), userHttp.updateUsers)  
    .delete(passport.authenticate('jwt', {session: false}), userHttp.deleteUser)
 

router.route('/:uuid/customer') 
    .post(passport.authenticate('jwt', {session: false}), userHttp.postCumtonDetails)
    .get(passport.authenticate('jwt', {session: false}), userHttp.getClient)

module.exports = {
    router
}