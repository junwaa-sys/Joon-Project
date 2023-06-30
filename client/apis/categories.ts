import request from 'superagent'
import * as models from '../../models/categories'

const rootUrl = '/api/v1/category'

function getCategoriesByUserId(token: string): Promise<models.Category[]> {
  return request
    .get(rootUrl + '/')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

function addCategory(token: string, categoryData: models.NewCategory) {
  return request
    .post(rootUrl + '/add')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

function updateCategory(
  categoryId: number,
  categoryData: models.UpdateCategory
) {
  return request.put(rootUrl + '/update/' + categoryId).then((res) => {
    return res.body
  })
}

function deleteCategory(categoryId: number) {
  return request.delete(rootUrl + '/delete/' + categoryId).then((res) => {
    return res.body
  })
}

export default {
  getCategoriesByUserId,
  addCategory,
  updateCategory,
  deleteCategory,
}
