import { getTransactions } from '../../actions/getTransactions'
import * as models from '../../../models/transactions'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useEffect, useState } from 'react'
import { Table } from '@mantine/core'
import { Pagination, Flex, Input } from '@mantine/core'
import { search } from 'superagent'

interface Props {
  transData: models.Transactions[]
  loading: boolean
}

export default function TransactionList(props: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const dataWithSearchString = props.transData.map((data) => {
    return {
      ...data,
      searchString:
        data.id.toString() +
        data.amount.toString() +
        data.payee +
        data.particular +
        data.code +
        data.reference +
        data.note,
    }
  })

  const dataAfterSearch = dataWithSearchString.filter((data) => {
    if (searchText === '') {
      return data
    } else {
      if (data.searchString.toLowerCase().includes(searchText.toLowerCase())) {
        return data
      } else {
        return null
      }
    }
  })

  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageData = dataAfterSearch.slice(startIndex, endIndex)
  const totalPages = Math.ceil(props.transData.length / itemsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)
  }

  const rows = pageData.map((element) => (
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
      {props.loading ? (
        <div className=" flex justify-center">
          <p>LOADING...</p>
        </div>
      ) : (
        <>
          <div>
            <Flex
              mih={50}
              gap="md"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
              mb={10}
            >
              <Input.Wrapper label="Search By Text">
                <Input
                  placeholder="Enter Text"
                  onChange={handleChangeName}
                  value={searchText}
                />
              </Input.Wrapper>
            </Flex>
          </div>
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
            <tbody>{rows}</tbody>
          </Table>
          <Pagination
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            total={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}
