import express from 'express'
import { CategoryModel } from '@src/models'
import { entryRoute } from '@controllers/routes'
import { dbConnect } from '@controllers/db'

dbConnect()

async function addEntry () {
  return async () => { return await CategoryModel.findOne({ name: 'Coding' }) }
}

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (req, res) => { res.send({ info: 'Journal API', test: 'hot module' }) })

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoute)

app.listen(port)
