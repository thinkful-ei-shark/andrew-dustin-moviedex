/*eslint-disable */ 
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./movies-data-small.json')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const apiToken = process.env.API_TOKEN

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next){

const apiToken=process.env.API_TOKEN
const authToken = req.get('Authorization')

if(!authToken || authToken.split(' ')[1] !== apiToken){
    return res.status(401).json({error: "unauthorized request!"})
} next()
})

function handleGetMovies(req, res){
    let results = MOVIEDEX
    let genre = req.query.genre
    let country = req.query.country
    let avgVote = parseFloat(req.query.avg_vote)
    if(genre){
        results = results.filter(movie=>movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }
    if (country){
        results = results.filter(movie=>movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    if (avgVote){
        results = results.filter(movie=>movie.avg_vote >= avgVote)
    }
    res.json(results)
}

function listAllMovies(req,res){
    let results=MOVIEDEX.map(movie=>movie.film_title)
    res.json(results)
}

app.get('/movie', handleGetMovies)
app.get('/listall',listAllMovies)

const PORT = 8000

app.listen(PORT, () =>{
    console.log(`server listening at http://localhost:${PORT}`)
})