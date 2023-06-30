import * as models from '../../models/categories'
import {
  GetCategoriesAction,
  REQUEST_CATEGORY_LIST,
  RECEIVE_CATEGORY_LIST,
  FAILURE_CATEGORY_LIST,
} from '../actions/getCatetories'

interface GetCategoryState {
  data: models.Category[] | null
  error: string | null
  loading: boolean
}

const initialState: GetCategoryState = {
  data: null,
  error: null,
  loading: true,
}

function getCategoryReducer(
  state = initialState,
  action: GetCategoriesAction
): GetCategoryState {
  switch (action.type) {
    case REQUEST_CATEGORY_LIST:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case RECEIVE_CATEGORY_LIST:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_CATEGORY_LIST:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default getCategoryReducer
