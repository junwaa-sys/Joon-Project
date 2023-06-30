import * as models from '../../../models/categories'
import { getCategories } from '../../actions/getCatetories'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useEffect, useState } from 'react'
import CategoryList from '../categories/CategoryList'

export default function Categories() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [editData, setEditData] = useState<models.Category | null>(null)
  const receivedCategories = useAppSelector((state) => state.getCategories)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getAccessTokenSilently().then((token) => {
      dispatch(getCategories(token))
      console.log(receivedCategories)
    })
  }, [dispatch, getAccessTokenSilently])

  console.log(receivedCategories)

  function handleDblClick(element: models.Category) {
    setEditData(element)
  }

  if (receivedCategories.loading) {
    return <div> Loading ....</div>
  } else {
    return (
      <>
        <CategoryList
          categoryData={receivedCategories?.data}
          handleDblClick={handleDblClick}
          loading={receivedCategories?.loading}
        />
      </>
    )
  }
}
