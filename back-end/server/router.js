const express = require('express')
const router = express.Router()
const campsite = require('./Controllers/Randy/Campsite.js')

router.get('/campsites', (req, res) => campsite.get(req, res))

module.exports = router