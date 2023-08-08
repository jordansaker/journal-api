import { EntryModel, CategoryModel } from '@src/models'
import { dbClose, dbConnect } from './db.js'
import dotenv from 'dotenv'

dotenv.config()
dbConnect()

const categories = [
  { name: 'Food' },
  { name: 'Gaming' },
  { name: 'Coding' },
  { name: 'Other' }
]

await CategoryModel.deleteMany()
console.log('Categories deleted')
const cats = await CategoryModel.insertMany(categories)
console.log('Categories seeded')

const entries = [
  { category: cats[0], content: 'Pizza is yummy!' },
  { category: cats[2], content: 'Coding is fun!' },
  { category: cats[1], content: 'Skyrim is for the Nords!' }
]

await EntryModel.deleteMany()
console.log('Entries deleted')
await EntryModel.insertMany(entries)
console.log('Entries seeded')

dbClose()
