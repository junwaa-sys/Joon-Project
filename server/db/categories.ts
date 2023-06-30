import connection from './connection'
import * as models from '../../models/categories'
import { ModuleResolutionKind } from 'typescript'

function getAllCategories(
  userId: string,
  db = connection
): Promise<models.Category[]> {
  return db('categories')
    .select('id', 'name', 'descaription', 'user_id as userId')
    .where('user_id', userId)
}

function getCategoryById(
  categoryId: number,
  db = connection
): Promise<models.Category[]> {
  return db('categories')
    .select('id', 'name', 'description', 'user_id as userId')
    .where('id', categoryId)
}

function addCategory(
  userId: string,
  categoryData: models.NewCategory,
  db = connection
) {
  return db('categories')
    .insert({
      name: categoryData.name,
      description: categoryData.description,
      user_id: categoryData.userId,
    })
    .returning(['id'])
}

function updateCategory(
  categoryId: number,
  categoryData: models.UpdateCategory,
  db = connection
) {
  return db('categories')
    .update({ name: categoryData.name, description: categoryData.description })
    .where('id', categoryId)
    .returning(['id'])
}

function deleteCategory(categoryId: number, db = connection) {
  return db('categories').delete().where('id', categoryId).returning(['id'])
}

export default {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
}
