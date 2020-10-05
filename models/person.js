const mongoose = require('mongoose')

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3
        },
        number: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
      })

      module.exports = mongoose.model('Person', personSchema)
