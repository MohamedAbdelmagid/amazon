const router = require('express').Router()
const Product = require('../models/product')


// Add new product endpoint
router.post('/products', async (req, res) => {
  try {
    const product = new Product()

    product.title = req.body.title
    product.description = req.body.description
    product.photo = req.body.photo
    product.stockQuantity = req.body.stockQuantity

    await product.save()
    res.json({ success: true, message: 'New product is added !'})
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router