require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

morgan.token('bodydata', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ' '
})

app.use(morgan(':method :url :status '
    + ':res[content-length] - :response-time ms :bodydata'))

app.use(cors())

app.use(express.static('build'))

function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running (port ${PORT})...`)
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            //console.log(persons)
            //persons.forEach(p => console.log('testin ' + p))
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
    if (note) response.json(note)
    else response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info on ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: getRand(0, 1000000),
    }

    persons = persons.concat(person)
    response.json(person)
})

