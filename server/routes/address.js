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

// Update a particular address endpoint
router.put('/addresses/:id', verifyToken, async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: req.decoded._id,
          country: req.body.country,
          fullName: req.body.fullName,
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          phoneNumber: req.body.phoneNumber,
          deliverInstructions: req.body.deliverInstructions,
          securityCode: req.body.securityCode
        }
      },
      {
        upsert: true, //  inserts a new document if no document matches 
        new: true //  return the new updated document
      }
    )

    res.json({ success: true, updated: address })

  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

// Delete a particular address endpoint
router.delete('/addresses/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete(
      {
        _id: req.params.id,
        user: req.decoded._id,
      }
    )

    if (deleted) {
      res.json({ success: true, message: 'Deleted' })
    }

  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

module.exports = router