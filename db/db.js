import mongoose from 'mongoose'

async function dbConnect () {
  try {
    await mongoose.connect(process.env.ATLAS_DB_URL)
    // console.log('Mongoose conected')
  } catch (error) {
    // console.log(`Mongoose Failed: ${error}`)
  }
}

async function dbClose () {
  await mongoose.connection.close()
  // console.log('DB connection ended')
}

export { dbClose, dbConnect }
