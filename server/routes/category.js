const router = require('express').Router()
const Category = require('../models/category')


// Add new category endpoint
router.post('/categories', async (req, res) => {
  try {
    const category = new Category()

    category.title = req.body.title

    await category.save()
    res.json({ success: true, message: 'New category is added !'})
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all categories endpoint
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find()

    res.json({ categories })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router