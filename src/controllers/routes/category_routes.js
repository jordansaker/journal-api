import { Router } from "express"
import { CategoryModel } from "@src/models"

const router = Router()

router.get('', async (req, res) => {
  res.send(await CategoryModel.find())
})

router.post('', async (req, res) => {
  try {
    const insertedCategory = await CategoryModel.create({ name: req.body.name })
    res.status(201).send(insertedCategory)
  }
  catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    updatedCategory ? res.send(updatedCategory) : res.status(404).send({ error: 'Category not found' })
  }
  catch (error) {
    res.send({ error: error.message })
  }
 })

 router.delete('/:id', async (req, res) => {
    try{
      const category = await CategoryModel.findByIdAndDelete(req.params.id)
      category ? res.sendStatus(200) : res.status(404).send({ error: 'Category not found' })
    }
    catch (error) {
      res.send({ error: error.message })
    }
  })

export default router
