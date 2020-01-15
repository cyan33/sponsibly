// @flow
import React from 'react'
import DatePicker from 'material-ui/DatePicker'

type Props = {
  value: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>, date: Date) => void,
  disabled: boolean
}

export default function FormDatePicker(props: Props) {
  return (
    <DatePicker
      id="date-picker"
      autoOk={true}
      {...props}
    />
  )
}
