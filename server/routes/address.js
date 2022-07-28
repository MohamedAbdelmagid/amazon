const router = require('express').Router()
const axios = require('axios')

const Address = require('../models/address')
const verifyToken = require('../middlewares/verify-token')


// Add new category endpoint
router.post('/addresses', verifyToken, async (req, res) => {
  try {
    const address = new Address()

    address.user = req.decoded._id
    address.country = req.body.country
    address.fullName = req.body.fullName
    address.streetAddress = req.body.streetAddress
    address.city = req.body.city
    address.state = req.body.state
    address.zipCode = req.body.zipCode
    address.phoneNumber = req.body.phoneNumber
    address.deliverInstructions = req.body.deliverInstructions
    address.securityCode = req.body.securityCode

    const newAddress = await address.save()
    
    res.json({ success: true, address: newAddress })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all addresses of a user endpoint
router.get('/addresses/:user', verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.user })

    res.json({ addresses })
    
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})


module.exports = router