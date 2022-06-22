const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))


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
    console.log('Server is listening at port 3000 ...');
  }
})