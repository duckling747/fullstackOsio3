const express = require('express')


const app = express()
app.use(express.json())

let persons = [
    {
        name: "Arto",
        number: "021341234",
        id: 1
    },
    {
        name: "Ada",
        number: "5324523452345",
        id: 2
    },
    {
        name: "Dan",
        number: "99988899",
        id: 3
    }
]

function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running (port ${PORT})...`)
})

app.get('/', (request, response) => {
    response.send('<div>Welcome to server! '
    + 'Try "http://localhost:3001/api/persons"</div>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
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
    const person = {
        name: body.name,
        number: body.number,
        id: getRand(0, 1000000),
    }

    persons = persons.concat(person)
    response.json(person)
})

