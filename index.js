const express = require('express')
const app = express()

let _PERSONS = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
    var today = new Date()
    response.send('<p>Phonebook has info for ' + persons.length + ' people.</p>' + '<p>' + today +'</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(persons.some(p => p.name === body.name))
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    } else if (persons.some(p => p.name === body.name) != []) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const id = Math.floor(Math.random() * 100000000000)
    const newPerson = { id: id, name: body.name, number: body.number }
    persons = persons.concat(newPerson)

    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
