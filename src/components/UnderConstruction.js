// @flow
import React from 'react'
import Paper from 'material-ui/Paper'
import { css } from 'glamor'
import GithubIcon from '../images/Github.svg'
import { emojify } from 'react-emoji'

type Props = {
  section: string
}

export default function UnderConstruction(props: Props) {
    const { section } = props
    return (
      <Paper {...css({
        width: '90%',
        height: '90%',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        top: '1.5rem',
        textAlign: 'center'
      })}>
        <div>
          <h3>
            The { section } section is under construction &nbsp;
            { emojify(':construction:') }
          </h3>
          <br/>
          I'm waiting for your ideas to help improve this application!
          <div {...css({ margin: '1rem 0 1.4rem 0' })}>
            { emojify(':heartpulse:') } &nbsp;
            View the source code: &nbsp;
            { emojify(':heartpulse:') }<br/>
            (PRs are welcome!)
          </div>
        </div>
        <a href="http://github.com/cyan33/eat-more-veggie">
          <img 
            src={GithubIcon}
            alt="github-icon"
            {...css({ width: '3rem' })}
          />
        </a>
      </Paper>
    )
}
