const express = require('express')
const bodyParser = require('body-parser')
const  bookRoutes = require('./routes/bookRoutes')

const app = express()
const PORT = 1111;


app.use(bodyParser.json())


app.use('/books',bookRoutes)



app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})