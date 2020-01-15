// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import { MATERIAL } from '../theme'

type Props = {
  fullWidth?: boolean,
  value: string,
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => any,
  disabled: boolean,
  hintText?: string
}

export default function FormInput({ 
  fullWidth = true,
  value,
  ...props
}: Props) {
  return (
    <TextField
      {...props}
      id="form-input"
      value={value}
      fullWidth={fullWidth}
      underlineStyle={MATERIAL.textField.underlineStyle}
      underlineFocusStyle={MATERIAL.textField.underlineFocusStyle}
    />
  )
}
