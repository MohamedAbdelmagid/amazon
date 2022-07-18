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
    product.price = req.body.price
    product.owner = req.body.owner
    product.category = req.body.category

    await product.save()
    res.json({ success: true, message: 'New product is added !'})
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all products endpoint
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('owner category').exec()

    res.json({ success: true, products })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get a particular product endpoint
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('owner category').exec()

    res.json({ success: true, product })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update a particular product endpoint
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
          stockQuantity: req.body.stockQuantity,
          owner: req.body.owner,
          photo: req.body.photo,
        }
      },
      {
        upsert: true, //  inserts a new document if no document matches 
        new: true //  return the new updated document
      }
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