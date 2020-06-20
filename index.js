const express = require('express')


const app = express()
app.use(express.json())

let notes = [
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

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running (port ${PORT})...`)
})

app.get('/', (request, response) => {
    response.send('<div>Welcome to server! '
    + 'Try "http://localhost:3001/api/persons"</div>')
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) response.json(note)
    else response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info on ${notes.length} people</p>
        <p>${new Date()}</p>
    `)
})

