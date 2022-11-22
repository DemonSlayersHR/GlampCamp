const express = require('express')
const router = express.Router()
const users = require('./Controllers/Monica/userController.js');
const campsite = require('./Controllers/Randy/Campsite.js')
const campdates = require('./Controllers/Randy/CampDates.js')
const campphotos = require('./Controllers/Randy/CampPhotos.js')
const campreviews = require('./Controllers/Randy/CampReviews.js')

// ----------------------- GET  -----------------------
router.get('/user', users.getUser)
router.get('/campsites', (req, res) => campsite.get(req, res))

// ----------------------- POST -----------------------
router.post('/campsites', (req, res) => campsite.post(req, res))
router.post('/campsites/dates', (req, res) => campdates.post(req, res))
router.post('/campsites/photos', (req, res) => campphotos.post(req, res))
router.post('/campsites/reviews', (req, res) => campreviews.post(req, res))

// ----------------------- PUT -----------------------
router.put('/campsites', (req, res) => campsite.put(req, res))
router.put('/campsites/dates', (req, res) => campdates.put(req, res))
router.put('/campsites/photos', (req, res) => campphotos.put(req, res))
router.put('/campsites/reviews', (req, res) => campreviews.put(req, res))

// ----------------------- DELETE -----------------------
router.delete('/campsites', (req, res) => campsite.delete(req, res))
router.delete('/campsites/dates', (req, res) => campdates.delete(req, res))
router.delete('/campsites/photos', (req, res) => campphotos.delete(req, res))
router.delete('/campsites/reviews', (req, res) => campreviews.delete(req, res))

module.exports = router