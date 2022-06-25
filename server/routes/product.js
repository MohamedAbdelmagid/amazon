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

// Get all products endpoint
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()

    res.json({ success: true, products })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get a particular product endpoint
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })

    res.json({ success: true, product })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update a particular product endpoint
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          description: req.body.description,
          stockQuantity: req.body.stockQuantity,
          owner: req.body.ownerID,
        }
      },
      { upsert: true }
    )

    res.json({ success: true, updated: product })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete a particular product endpoint
router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id })

    if (deleted) {
      res.json({ success: true, message: 'Deleted' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router