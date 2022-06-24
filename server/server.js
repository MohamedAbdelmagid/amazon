const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_URI, { useUnifiedTopology: false }, err => {
  if (err) console.log(err)
  else console.log('MongoDB is connected..')
})


app.get('/', (req, res) => {
  res.json("Amazon server :)")
})

app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(3000, err => {
  if (err) {
    console.log('err :>> ', err)
  } else {
    console.log('Server is listening at port 3000 ...')
  }
})