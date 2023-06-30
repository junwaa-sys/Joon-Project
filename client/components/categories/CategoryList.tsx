import * as models from '../../../models/categories'
import { useState } from 'react'
import { Table } from '@mantine/core'
import { Pagination, Flex, Input } from '@mantine/core'

interface Props {
  categoryData: models.Category[]
  handleDblClick(element: models.Category): any
  loading: boolean
}

export default function CategoryList(props: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const dataWithSearchString = props.categoryData.map((data) => {
    return {
      ...data,
      searchString:
        data.id.toString() +
        data.description +
        data.name,        
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
  const totalPages = Math.ceil(props.categoryData.length / itemsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)
  }

  const rows = pageData.map((element) => (
    <tr
      key={element.id}
      onDoubleClick={() => {
        props.handleDblClick(element)
      }}
    >
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.description}</td>      
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
