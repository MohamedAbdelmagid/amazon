const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const ownerRoutes = require('./routes/owner')

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(morgan('dev'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

// Routes
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownerRoutes)

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