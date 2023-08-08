import express from 'express'
import { CategoryModel } from '@src/models'
import { entryRoute } from '@controllers/routes'
import { dbConnect } from '@controllers/db'
import dotenv from 'dotenv'

dotenv.config()
dbConnect()

const app = express()
const port = 4001

app.use(express.json())

app.use('/entries', entryRoute)

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.listen(port)
