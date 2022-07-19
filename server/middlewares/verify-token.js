const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    // Remove 'Bearer' prefix if exists
    const bearer = 'Bearer '
    if (token.startsWith(bearer)) {
      token = token.slice(bearer.length, token.length)
    }

    // Verify and decode the token
    jwt.verify(token, process.env.ENCRYPT_KEY, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.json({ success: false, message: "No token provided !!" })
  }
}