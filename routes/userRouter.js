
// IMPORT EXPRESS ROUTER FROM EXPRESS

const router = require('express').Router()


// IMPORT THE USER CONTROLLER

const ctrl = require('../controllers/userCtrl')


// IMPORT MIDDLEWARE

const auth = require('../middleware/auth')


// ALL ROUTES


// --- REGISTER A NEW USER ----

router.post('/register', ctrl.register)

// --- VERIFY A USER WITH TWO-STEP VERIFICATION

router.post('/verify-sms', ctrl.verifySms)

// -- GENERATES A NEW ACCESS AND REFRESH TOKEN

router.get('/refresh-token', ctrl.refresh)

// --- LOGS A USER IN

router.post('/login', ctrl.login)

// --- LOGS A USER OUT

router.get('/logout', ctrl.logout)

// --- GETS THE USER INFORMATION

router.get('/infor', auth, ctrl.getUser)

// --- DELETES THE LOGGED USER

router.delete('/delete', auth, ctrl.delete)

// EXPORT THE ROUTER

module.exports = router