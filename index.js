require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.static('build'))

app.use(express.json())
morganBody(app)
morgan('tiny')

const Person = require('./models/person')

let time = new Date();

const generateId = () => {
    const maxId = persons.length > 1
    ? Math.max(...persons.map(n => n.id))
    : 0 
    return maxId
}

app.get('/', (request, response) => {
    response.send(`<h1>Hello Worlds</h1>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info/', (request, response) => {
    response.send(`<p>Phonebook has info for ${Person.length} people</p> <p> ${time} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
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

    // const name = persons.filter(person => {
    //     if (person.name === body.name) {
           
    //         return response.status(404).json({
    //             error: 'Name already exists'
    //         })
    //     } 
    // });
    // if(!body.name){
    //     return response.status(404).json({
    //         error: 'Name is missing from request'
    //     })
    // } 


})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})