const express = require ('express');
const app = express()

// app.use(express.json)

let persons = [
          {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1
          },
          {
            name: "Ada Lovelace",
            number: "39-44-5323523",
            id: 2
          },
          {
            name: "Dan Abramov",
            number: "12-43-234345",
            id: 3
          },
          {
            name: "Mary Poppendieck",
            number: "39-23-6423122",
            id: 4
          },
          {
            name: "Firstname Lastname",
            number: "555-5555",
            id: 5
          },
          {
            name: "john smith",
            number: "867-5309",
            id: 6
          },
          {
            name: "jon doe",
            number: "8888888",
            id: 7
          },
          {
            name: "james ferguson",
            number: "234-555-6778",
            id: 8
          },
          {
            name: "hanrick fugherty",
            number: "234-55-6666",
            id: 9
          },
          {
            name: "maggie o'reilly",
            number: "123-234-2345",
            id: 10
          },
          {
            name: "heinz schmitt",
            number: "234-234-5555",
            id: 12
          },
          {
            name: "dan the man",
            number: "123-444-5555",
            id: 13
          },
          {
            name: "df",
            number: "33",
            id: 15
          }
]

let time = new Date();

app.get('/', (request, response) => {
    response.send(`<h1>Hello Worlds</h1>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info/', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> ${time} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id );
    if(person){
        response.json(person)
    } else {
        response.status(204).end()
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})