const router = require('express').Router()
const axios = require('axios')

// Get countries endpoint
router.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all')

    res.json(response.data)

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


module.exports = router