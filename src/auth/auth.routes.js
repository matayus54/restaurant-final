const router = require('express').Router()
const http = require('./auth.http')
const passport = require('passport');
require('../tools/auth')(passport)


//? /reset-password
//! similar a verificacion

//? /verify-account

//? /desactivate-account 
//! /me/desa

router.route('/login')
    .post(http.loginUser)

router.route('/sigin')
    .post(http.registerUser)

router.route('/me/verify-account')
    .get(passport.authenticate('jwt', {session: false}), http.generateVerifyToken)

router.route('/verify-account')
    .get(http.verifyAccount)

exports.router = router