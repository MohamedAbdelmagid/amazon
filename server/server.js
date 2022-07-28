const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')
const authRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review')
const addressRoutes = require('./routes/address')
const generalRoutes = require('./routes/general')

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

// Routes
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)
app.use('/api', authRoutes)
app.use('/api', reviewRoutes)
app.use('/api', addressRoutes)

mongoose.connect(process.env.LOCAL_DB_URI, { useUnifiedTopology: false }, err => {
  if (err) console.log(err)
  else console.log('MongoDB is connected..')
})


app.listen(port, err => {
  if (err) {
    console.log('err :>> ', err)
  } else {
    console.log(`Server is listening at port ${port}...`)
  }
})