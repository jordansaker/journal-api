import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    cast: false
   }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { CategoryModel }
