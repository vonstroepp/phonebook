const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://vonstroepp:${password}@cluster0.qlfii.mongodb.net/person-app?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: Date
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    date: new Date(),
    number: number,
})

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
    } else if (process.argv.length < 4) {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
    } else {
        person.save().then(result => {
          console.log(`Added ${name} number ${number} to phonebook`)
          mongoose.connection.close()
        })
    }


