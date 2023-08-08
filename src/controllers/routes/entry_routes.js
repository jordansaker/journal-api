import { Router } from "express"
import { EntryModel, CategoryModel } from "@src/models"

const router = Router()

router.get('', async (req, res) => {
  res.send(await EntryModel.find().populate('category', 'name -_id').exec())
})

router.post('', async (req, res) => {
  try {
    const theCat = await CategoryModel.findOne({ name: req.body.category })
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat._id })
      res.status(201).send(insertedEntry)
    } else {
      res.status(404).send({ error: 'category not found' })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id).populate('category', 'name -_id').exec()
    entry ? res.send(entry) : res.status(404).send({ error: 'Entry not found' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.category) {
      await CategoryModel.findOne({ name: req.body.category })
      ? 
      updatedEntry.category =  await CategoryModel.findOne({ name: req.body.category })._id
      :
      res.status(404).send({ error: 'category not found' })
    }
    updatedEntry.content = req.body.content && req.body.content
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, updatedEntry, { new: true, runValidators: true })
    entry ? res.send(entry) : res.status(404).send({ error: 'Entry not found' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    entry ? res.sendStatus(200) : res.status(404).send({ error: 'Entry not found' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

export default router
