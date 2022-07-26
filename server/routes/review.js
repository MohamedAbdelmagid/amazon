const router = require('express').Router()
const Review = require('../models/review')
const Product = require('../models/product')
const verifyToken = require('../middlewares/verify-token')


// Submit review endpoint
router.post('/reviews/:product', verifyToken, async (req, res) => {
  try {
    const review = new Review()

    review.headline = req.body.headline
    review.body = req.body.body
    review.rating = req.body.rating
    review.photo = req.body.photo

    review.user = req.decoded._id
    review.product = req.params.product

    await Product.update({ $push: { reviews: review._id } })

    const savedReview = await review.save()
    if (savedReview) {
      res.json({ success: true, message: 'Successfully submitted !'})
    }
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Retreive a review endpoint
router.get('/reviews/:product', verifyToken, async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.product
    }).populate('user').exec()

    res.json({ success: true, reviews })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router