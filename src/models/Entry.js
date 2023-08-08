import mongoose from 'mongoose'

const valCategories = ['Food', 'Gaming', 'Coding', 'Other']

const validateCategory = function (val) {
  return !!valCategories.includes(val)
}

const entrySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  content: {
    type: String,
    required: true,
    cast: false
  }
})

const EntryModel = mongoose.model('Entry', entrySchema)

export { EntryModel, entrySchema }
