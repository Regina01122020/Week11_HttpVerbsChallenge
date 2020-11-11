const express = require('express')

const cors = require('cors') 
const app = express()
const port = 8080

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.listen(port, function() {
console.log(`Server listening at http://localhost:${port}`)
}) 