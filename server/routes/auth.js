const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const verifyToken = require('../middlewares/verify-token')


// Sign up route
router.post('/auth/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter password and email'})
  } else {
    try {
      const user = new User()
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password

      await user.save()

      const token = jwt.sign(user.toJSON(), process.env.ENCRYPT_KEY, {
        expiresIn: 604800
      })

      res.json({
        success: true,
        message: 'New user is created !',
        token
      })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
})

// Account route
router.get('/auth/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.decoded._id })
    if (user) {
      res.json({
        success: true,
        user
      })
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Login route
router.post('/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(403).json({
        success: false,
        message: 'Authentication failed, User not found !!'
      })
    } else {
      if (user.comparePassword(req.body.password)) {
        const token = jwt.sign(user.toJSON(), process.env.ENCRYPT_KEY, {
          expiresIn: 604800
        })

        res.json({ success: true, token })
      } else {
        res.status(403).json({
          success: false,
          message: 'Authentication failed, wrong password !'
        })
      }
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router