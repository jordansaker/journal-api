import express from 'express'

const categories = ['Food', 'Gaming', 'Coding', 'Other']
const entries = [
  {category: 'Food', content: 'Pizza is yummy!'},
  {category: 'Coding', content: 'Coding is fun!'},
  {category: 'Gaming', content: 'Skyrim is for the Nords!'}
]

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => {res.send({ info: 'Journal API', test: 'hot module'})})

app.get('/categories', (req, res) => res.send(categories))
app.get('/entries', (req, res) => res.send(entries))

app.post('/entries', (req, res) => {
  // 1. Retrieve data from request (req)
  console.log(req.body)
  // 2. TODO: Parse/validate it
  // 3. Push the new entry to the entries array
  entries.push(req.body)
  console.log(entries)
  // 4. Send the entry with 201 status
  res.status(201).send(req.body)
})

app.get('/entries/:id', (req, res) => {
  entries[req.params.id - 1] ? res.send(entries[req.params.id - 1]) : res.status(404).send({ error: 'Entry not found' })
})


app.listen(port)
