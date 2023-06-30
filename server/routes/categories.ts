import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import db from '../db/categories'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      return res
        .status(401)
        .send('log in failed. please log in firt to user the service!')
    }
    const categories = await db.getAllCategories(auth0Id)
    res.json(categories)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting categories.' })
    }
  }
})

router.post('/add', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const categoryData = req.body
    if (!auth0Id) {
      return res
        .status(401)
        .send('log in failed. please log in firt to user the service!')
    }

    const addedCategory = await db.addCategory(auth0Id, categoryData)
    res.send(addedCategory)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting categories.' })
    }
  }
})

router.put('/update/:categoryId', async (req, res) => {
  try {
    const categoryData = req.body
    const categoryId = Number(req.params.categoryId)
    const updatedCategory = await db.updateCategory(categoryId, categoryData)
    res.send(updatedCategory)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting categories.' })
    }
  }
})

router.delete('/delete/:categoryId', async (req, res) => {
  try {
    const categoryId = Number(req.params.categoryId)
    const deletedCategory = await db.deleteCategory(categoryId)
    res.send(deletedCategory)
  } catch (error) {
    if (error instanceof Error) {
      res.json(error.message)
    } else {
      console.log(error)
      res.json({ message: 'unknown error occured while getting categories.' })
    }
  }
})
