
// IMPORT EXPRESS ROUTER FROM EXPRESS

const router = require('express').Router()


// IMPORT THE USER CONTROLLER

const ctrl = require('../controllers/userCtrl')


// ALL ROUTES


// --- REGISTER A NEW USER ----

router.post('/register', ctrl.register)


// EXPORT THE ROUTER

module.exports = router