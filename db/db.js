import mongoose from "mongoose"

async function dbConnect () {
  try {
    await mongoose.connect('mongodb+srv://journal_dev:9L2EkAOoejrMNz7y@clusterfamily.yjrp3d8.mongodb.net/journal?retryWrites=true&w=majority')
    console.log('Mongoose conected')
  }
  catch (error) {
    console.log(`Mongoose Failed: ${error}`)
  }
}

async function dbClose () {
  await mongoose.connection.close()
  console.log('DB connection ended')
}

export { dbClose, dbConnect }
