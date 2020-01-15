import React from 'react'
import { css } from 'glamor'

import GoogleIcon from '../images/Google.svg'
import GitHubIcon from '../images/Github.svg'

export default function LoginRoute({ login }) {
  const signInItem = css({
    listStyle: 'none',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    '&:first-child': {
      marginBottom: '1rem'
    },
    cursor: 'pointer'
  })

  return (
    <ul {...css({
      display: 'flex',
      width: '100%', height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
    })}>
      {/* <li className={signInItem} onClick={() => login('github')}>
        <img
          alt="Sign in with GitHub"
          {...css({ width: '2rem', marginRight: '1rem' })}
          src={GitHubIcon}
        />
        Sign in with GitHub
      </li> */}

      <li className={signInItem} onClick={() => login('google')}>
        <img
          alt="Sign in with Google"
          {...css({ width: '2rem', marginRight: '1rem' })}
          src={GoogleIcon}
        />
        Sign in with Google
      </li>
    </ul>
  );
}
