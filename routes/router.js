const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/fetchDetails/:vrNo',controller.getDetails)
router.get('/fetchItems',controller.getDetails)
router.post('/addItem',controller.addItem)

module.exports = router