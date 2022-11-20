const express = require('express')
const router = express.Router()
const users = require('./Controllers/Monica/userController.js');
const campsite = require('./Controllers/Randy/Campsite.js')

router.get('/user',users.getUser)
router.get('/campsites', (req, res) => campsite.get(req, res))

module.exports = router