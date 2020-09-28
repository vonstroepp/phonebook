require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
// const logger = require('logger')

const app = express()
app.use(cors())

app.use(express.static('build'))
app.use(express.json())
// app.use(logger)
// TODO: research logger functionality and proper implementation

morganBody(app)
morgan('tiny')

const Person = require('./models/person')

let time = new Date();

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minilength: 3,
    required: true
  },
  number :{
    type: Number,
    minilength: 7,
  },
  date: {
    type: Date,
    required: true
  },
})

personSchema.plugin(uniqueValidator);

app.get('/', (request, response) => {
    response.send(`<h1>Phonebook App</h1>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info/', (request, response) => {
    response.send(`<p>Phonebook has info for ${Person.length} people</p> <p> ${time} </p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request,response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  })
  
  person
    .save()
      .then(savedPerson => savedPerson.toJSON())
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of request with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('error:', error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted ID '})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})