require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const cors = require('cors')
const mongoose = require('mongoose')
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

app.post('/api/persons/', (request,response) => {
  const body = request.body
  if(body.name === undefined){
    return response.status(400).json({error: 'content missing'})
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
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
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})