import { getTransactions } from '../../actions/getTransactions'
import * as models from '../../../models/transactions'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useEffect, useState } from 'react'
import { Table } from '@mantine/core'

interface Props {
  transData: models.Transactions[]
  loading: boolean
}

export default function TransactionList(props: Props) {
  const rows = props.transData.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.transactionDate}</td>
      <td>{element.payee}</td>
      <td>{element.amount}</td>
      <td>{element.particular}</td>
      <td>{element.code}</td>
      <td>{element.reference}</td>
      <td>{element.note}</td>
    </tr>
  ))
  return (
    <>
      {!props.loading ? (
        <div className=" flex justify-center">
          <p>Loading....</p>
        </div>
      ) : (
        <>
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Payee</th>
                <th>Amount</th>
                <th>Particular</th>
                <th>Code</th>
                <th>Reference</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>{rows ? 'No Data' : rows}</tbody>
          </Table>
        </>
      )}
    </>
  )
}
