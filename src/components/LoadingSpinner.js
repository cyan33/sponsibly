// @flow
import React from 'react'
import { css } from 'glamor'
import CircularProgress from 'material-ui/CircularProgress'

export default function LoadingSpinner({small = false}) {
  return (
    <div {...css({
      position: 'fixed',
      left: '50%', top: '45%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999
    })}>
      <CircularProgress
        size={small ? 35 : 60}
        thickness={small ? 5 : 7}
        color="#9ccc65" 
      />
    </div>
  )
}
