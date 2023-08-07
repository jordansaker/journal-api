import express from 'express'
import mongoose from 'mongoose'

const categories = [
  {name:'Food'},
  {name: 'Gaming'},
  {name:'Coding'},
  {name:'Other'}
]

const valCategories = [ "Food", "Gaming", "Coding", "Other" ]

const entries = [
  {category: 'Food', content: 'Pizza is yummy!'},
  {category: 'Coding', content: 'Coding is fun!'},
  {category: 'Gaming', content: 'Skyrim is for the Nords!'}
]

mongoose.connect(`mongodb+srv://journal_dev:9L2EkAOoejrMNz7y@clusterfamily.yjrp3d8.mongodb.net/journal?retryWrites=true&w=majority`)
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose conected' : 'Mongoose Failed'))
  .catch(err => console.error(err))

const { Schema } = mongoose

const validateCategory = function (val) {
  return valCategories.includes(val) ? true : false
}

const entrySchema = new Schema({
  category: {
    type: String,
    required: true,
    validate: validateCategory,
    cast: false
  },
  content: {
    type: String,
    required: true,
    cast: false
  },
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new Schema({
  name: { type: String, required: true }
})

const CategoryModel = mongoose.model('Category', categorySchema)

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => {res.send({ info: 'Journal API', test: 'hot module'})})

app.get('/categories',  async (req, res) => res.send(await CategoryModel.find()))

app.get('/entries', async (req, res) => {
  res.send({
    Entries: await EntryModel.find()
  })
})

app.post('/entries', async (req, res) => {
  try {
    const insertedEntry = await EntryModel.create(req.body);
    res.status(201).send(insertedEntry);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

app.get('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id)
    entry ? res.send(entry) : res.status(404).send({ error: 'Entry not found' })
  }
  catch (error) {
    res.status(500).send({ error: error.message })
  }
})

app.put('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, { category: req.body.category, content: req.body.content}, {new: true, runValidators: true})
    entry ? res.send(entry) : res.status(404).send({ error: 'Entry not found' })
  }
  catch (error) {
    res.status(500).send({ error: error.message })
  }
})

app.delete('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    entry ? res.sendStatus(200) : res.status(404).send({ error: 'Entry not found' })
  }
  catch (error) {
    res.status(500).send({ error: error.message })
  }
  
})

app.listen(port)
