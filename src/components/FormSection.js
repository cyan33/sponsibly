// @flow
import * as React from 'react'
import { css } from 'glamor'

type Props = {
  children: React.Node,
  direction?: string,
  additionalStyle?: Object
}

export default function FormSection({ children, direction = 'column', additionalStyle={} }: Props) {
  return (
    <section {...css({
      display: 'flex',
      flexDirection: direction,
      margin: '0.8rem',
      // '&:first-child': { margin: '0' },
      padding: '0 1rem',
      ...additionalStyle
    })}>
      {children}
    </section>
  )
}
