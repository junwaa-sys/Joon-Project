import * as models from '../../models/categories'
import { ThunkAction } from '../store'
import apis from '../apis/categories'

export const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORY_LIST'
export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST'
export const FAILURE_CATEGORY_LIST = 'FAILURE_CATEGORY_LIST'

export type GetCategoriesAction =
  | { type: typeof REQUEST_CATEGORY_LIST; payload: void }
  | { type: typeof RECEIVE_CATEGORY_LIST; payload: models.Category[] }
  | { type: typeof FAILURE_CATEGORY_LIST; payload: string }

export function requestGetCategories(): GetCategoriesAction {
  return {
    type: REQUEST_CATEGORY_LIST,
  } as GetCategoriesAction
}

export function receiveGetCategories(
  categories: models.Category[]
): GetCategoriesAction {
  return {
    type: RECEIVE_CATEGORY_LIST,
    payload: categories,
  }
}

export function failureGetCategories(error: string): GetCategoriesAction {
  return {
    type: FAILURE_CATEGORY_LIST,
    payload: error,
  }
}

export function getCategories(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestGetCategories())
    return apis
      .getCategoriesByUserId(token)
      .then((res) => {
        dispatch(receiveGetCategories(res))
      })
      .catch((error) => {
        dispatch(failureGetCategories(error.message))
      })
  }
}
