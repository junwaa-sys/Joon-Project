import { Flex, Input, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useState } from 'react'
import * as models from '../../../models/transactions'

interface Props {
  transData: models.Transactions | undefined
}

export default function AddEditTransaction(props: Props) {
  const year = props.transData?.transactionDate.substring(6, 10)
  const month = Number(props.transData?.transactionDate.substring(3, 5))
  const day = props.transData?.transactionDate.substring(0, 2)
  const transDate = new Date(`${year}, ${month - 1}, ${day}`)
  const payee = props.transData?.payee
  const [value, setValue] = useState<models.Transactions | undefined>(
    props.transData
  )

  function handleChange(value: Date) {
    setValue({ ...value, transactionDate: value })
    console.log(value)
  }

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
        mb={10}
      >
        <DateInput
          valueFormat="DD/MM/YYYY"
          label="Date"
          placeholder="Date"
          defaultValue={
            props.transData?.transactionDate
              ? new Date(`${year}-${month}-${day}`)
              : null
          }
          onChange={(value) => {
            handleChange(value)
          }}
        />
        <Input.Wrapper label="payee">
          <Input placeholder="payee" defaultValue={payee} />
        </Input.Wrapper>
        <Input.Wrapper label="amount">
          <Input placeholder="amount" defaultValue={props.transData?.amount} />
        </Input.Wrapper>
        <Input.Wrapper label="particular">
          <Input
            placeholder="particular"
            defaultValue={props.transData?.particular}
          />
        </Input.Wrapper>
        <Input.Wrapper label="code">
          <Input placeholder="code" defaultValue={props.transData?.code} />
        </Input.Wrapper>
        <Input.Wrapper label="reference">
          <Input
            placeholder="reference"
            defaultValue={props.transData?.reference}
          />
        </Input.Wrapper>
      </Flex>

      <Input.Wrapper label="note">
        <Textarea
          mb={10}
          placeholder="note"
          defaultValue={props.transData?.note}
        />
      </Input.Wrapper>
    </>
  )
}
