import express from 'express'
import { entryRouter, categoryRouter } from '@controllers/routes'
import { dbConnect } from '@controllers/db'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
dbConnect()

const app = express()


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {res.send({ info: 'Journal API' })})

app.use('/entries', entryRouter)

app.use('/categories', categoryRouter)

export default app