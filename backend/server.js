const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const port = 3000

// TO USE THE EJS TEMPLATE ENGINE
app.set('view engine', 'ejs')
// FOR PARSING THE URL ENCODED DATA 
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE FOR PARSING JSON OBJECTS
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

// IMPORT THE DB SCHEMA
const schema = require('./model/schema.js')

// CONNECTION TO THE DATABASE 
mongoose.connect('mongodb+srv://regina:lJh3MVjYfGtkzJRn@cluster1.utlod.gcp.mongodb.net/PetsDB?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true },
function(error, database) { 
    if (error) { 
        throw error
    } else {
        console.log("Connection made to database.")
    }
    
}) 

// JUST A TEST GET REQUEST TO CHECK IF THE ROUTES ARE WORKING
app.get('/', function(req, res){
    console.log('Routes are working...')
})

// GET REQUEST TO GET THE FORM
app.get('/pet', function(req, res) {
    schema.find({})
        .then(function(pets) {
            console.log(pets)
            res.send(pets)
        })
        .catch(function(error) {
            console.log(error)
            res.send(error)
        })
})


// POST REQUEST TO POST THE FORM 
app.post('/pet', function(req, res) {
    console.log("Post route hit")
    console.log(req.body)

petObject = {
    picture: req.body.picture,
    name: req.body.name,
    type_of_pet: req.body.type_of_pet,
    pet_colour: req.body.pet_colour,
    reason_for_pet_name: req.body.reason_for_pet_name
}

petToAdd = new schema(petObject)  

petToAdd.save() 
    .then(function(pet) {
        console.log("Pet Details Saved!")
        console.log(pet)
        res.send(pet)
    })
    .catch(function(error) {
        console.log(error)
    })
}) 

// PATCH REQUEST TO UPDATE AND MODIFY THE FORM
app.patch('/pet/:id', function(req, res) {
    console.log("HITTING the UPDATE route")
    console.log(req.params.id)
    schema.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(function(upDate) {
            console.log(upDate)
            res.send(upDate)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
})

// DELETE REQUEST TO DELETE THE FORM
app.delete('/pet/:id', function(req, res) {
    console.log("DELETE ROUTE hit")
    console.log(req.params.id)
    schema.findByIdAndDelete(req.params.id)
        .then(function(x) {
            console.log(x)
            res.send(x)
        })
        .catch(function(err) {
            console.log(err)
            res.send(err) 
        }) 
    })

// SERVER LISTENING AT THIS PORT
app.listen(port, function(){
    console.log(`Express App running at http://localhost:${port}`)
})