import * as models from '../../../models/transactions'
import { addTransaction } from '../../actions/addTransaction'
import { getTransactions } from '../../actions/getTransactions'
import { updateTransaction } from '../../actions/updateTransaction'
import { deleteTransaction } from '../../actions/deleteTransaction'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useEffect, useState } from 'react'
import TransactionList from './TransactionList'
import CsvImporter from './CsvImporter'
import AddEditTransaction from './AddEditTransaction'

export default function Transactions() {
  const [showField, setShowField] = useState(false)
  const [editData, setEditData] = useState<models.Transactions | null>(null)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const receivedTransactions = useAppSelector((state) => state.getTransactions)
  const addedTransaction = useAppSelector((state) => state.addTransacion)
  const updatedTransaction = useAppSelector((state) => state.updateTransaction)
  const deletedTransaction = useAppSelector((state) => state.deleteTransaction)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getAccessTokenSilently().then((token) => {
      dispatch(getTransactions(token))
    })
  }, [dispatch, getAccessTokenSilently, editData, addedTransaction])

  function handleDblClick(element: models.Transactions) {
    setEditData(element)
  }

  if (!receivedTransactions.data) {
    return <div> Loading ....</div>
  } else {
    return (
      <>
        <TransactionList
          transData={receivedTransactions?.data}
          handleDblClick={handleDblClick}
          loading={receivedTransactions?.loading}
        />
        <AddEditTransaction transData={editData} />
        <CsvImporter />
      </>
    )
  }
}
