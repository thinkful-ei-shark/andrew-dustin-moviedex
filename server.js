/*eslint-disable */ 
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./movies-data-small.json')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())






const PORT = 8000

app.listen(PORT, () =>{
    console.log(`server listening at http://localhost:${PORT}`)
})