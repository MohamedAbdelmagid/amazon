const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const User = require('./models/user')

dotenv.config()
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

mongoose.connect(process.env.LOCAL_DB_URI, { useUnifiedTopology: false }, err => {
  if (err) console.log(err)
  else console.log('MongoDB is connected..')
})


app.get('/', (req, res) => {
  res.json("Amazon server :)")
})

app.post('/', (req, res) => {
  const user = new User()

  user.name = req.body.name
  user.email = req.body.email
  user.password = req.body.password

  user.save(err => {
    if (err) {
      res.json(err)
    } else {
      res.json("sucess")
    }
  })
})

app.listen(3000, err => {
  if (err) {
    console.log('err :>> ', err)
  } else {
    console.log('Server is listening at port 3000 ...')
  }
})