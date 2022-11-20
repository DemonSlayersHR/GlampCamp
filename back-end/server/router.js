const express = require('express')
const router = express.Router()
const users = require('./Controllers/Monica/userController.js');

router.get('/user',users.getUser)

module.exports = router