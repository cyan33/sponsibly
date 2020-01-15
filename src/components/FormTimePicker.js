import React from 'react'
import TimePicker from 'material-ui/TimePicker'

type Props = {
  value: Date,
  onChange: (e: SyntheticEvent<HTMLInputElement>, time: Date) => void,
  disabled: boolean
}

export default function FormTimePicker(props: Props) {
  return (
    <TimePicker
      {...props}
      hintText="Choose a time"
      autoOk={true}
    />
  )
}
