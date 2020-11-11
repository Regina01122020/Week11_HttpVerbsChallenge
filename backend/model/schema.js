const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({

    picture: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    type_of_pet: {
        type: String,
        required: true
    },

    pet_colour: {
        type: String,
        required: true 
    },

    reason_for_pet_name: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Pets', petSchema) 