// @flow
import * as React from 'react'
import { css } from 'glamor'
import { NavLink } from 'react-router-dom'

type Props = {
  children?: React.Node,
  Icon: any,
  label: string,
  path: string
}

export default function FooterItem({ 
  children,
  Icon,
  label,
  path
}: Props) {
  const matchesLogging = (match, location) => {
    const isEditRoute = location.pathname.split('/')[1] === label.toLowerCase()
    return match || isEditRoute
  }

  return (
    <NavLink
      to={path}
      isActive={matchesLogging}
      replace
      activeClassName="navlink-active"
      {...css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        color: '#9e9e9e',
        cursor: 'pointer',
        '&.navlink-active': {
          color: '#6cb16a',
          '& svg': { fill: '#6cb16a !important'}
        }
      })}
    >
      <Icon />
      <span>{label}</span>
    </NavLink>
  )
}
