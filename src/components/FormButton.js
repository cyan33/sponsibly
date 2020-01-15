// @flow
import * as React from 'react'
import { css } from 'glamor'

type Props = {
  children?: React.Node,
  background: string,
  disabled: boolean,
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void
}

export default function FormButton({ children, background, disabled, onClick }: Props) {
  // todo: add these into the inline styles
  const extraStyle = {
    backgroundColor: background,
    marginBottom: '0.5rem',
    '&:disabled': { backgroundColor: '#dcedc8' }
  }

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      {...css({
        width: '100%',
        padding: '0.4rem',
        color: '#fff',
        fontSize: '1rem',
        border: 'none',
        transition: 'background 0.5s',
        '& svg': { marginRight: '0.3rem', fill: '#fff !important' }
      }, extraStyle)}
    >
      <div {...css({
        // safari 10 ignores align-items & justify content when the container box is a button
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}>
        {children}
      </div>
    </button>
  )  
}
