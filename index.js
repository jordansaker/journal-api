import express from 'express'

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const app = express()
const port = 4001

app.get('/', (req, res) => {res.send({ info: 'Journal API', test: 'hot module'})})

app.get('/categories', (req, res) => res.send(categories))

app.listen(port)
