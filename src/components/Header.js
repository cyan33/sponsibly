// @flow
import React from 'react'
import { css } from 'glamor'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'

type Props = {
  photoURL: string,
  signOut: () => void 
}

export default function Header({ 
  photoURL,
  signOut
}: Props) {
  return (
    <nav {...css({
      position: 'fixed',
      top: '0',
      width: '100%',
      height: '3.5rem',
      zIndex: '99',
      backgroundColor: '#6cb16a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff'
    })}>
      <img 
        src={photoURL}
        alt="avatar"
        {...css({
          width: '2rem',
          position: 'relative',
          left: '0.5rem',
          borderRadius: '100%',
          border: '0.1rem solid #fff',
          boxShadow: '0 0.3rem 1rem #00541e'
        })}
      />
      <span {...css({ fontWeight: '500' })}>
        Spend Responsibly
      </span>
      <div
        onClick={signOut}
        {...css({
          position: 'relative',
          right: '0.5rem',
          color: '#fff'
        })}
      >
        <ExitIcon color="#fff" />
      </div>
    </nav>
  )
}
