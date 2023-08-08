import express from 'express'
import { entryRouter, categoryRouter } from '@controllers/routes'
import { dbConnect } from '@controllers/db'
import dotenv from 'dotenv'

dotenv.config()
dbConnect()

const app = express()
const port = 4001

app.use(express.json())

app.use('/entries', entryRouter)

app.use('/categories', categoryRouter)

app.listen(port)
