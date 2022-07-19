const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')


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


module.exports = router