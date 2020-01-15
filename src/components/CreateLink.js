// @flow
import React from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { green300 } from 'material-ui/styles/colors';

type Props = {
  to: string
}

export default function CreateLink({ to }: Props) {
  return (
    <Link to={to} {...css({
      position: 'fixed',
      right: '2rem',
      bottom: '5rem',
      cursor: 'pointer',
    })}>
      <FloatingActionButton backgroundColor={green300}>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  )
}
