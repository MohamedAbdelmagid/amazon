const router = require('express').Router()
const Owner = require('../models/owner')


// Add new owner endpoint
router.post('/owners', async (req, res) => {
  try {
    const owner = new Owner()

    owner.name = req.body.name
    owner.about = req.body.about

    const newOwner = await owner.save()
    res.json({ success: true, newOwner })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all owners endpoint
router.get('/owners', async (req, res) => {
  try {
    const owners = await Owner.find()

    res.json({ owners })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router