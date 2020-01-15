// @flow
import React from 'react'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { css } from 'glamor'
import { Link } from 'react-router-dom'

import { getTimePeriodEmoji, getRatingEmoji, transfromDateString } from '../utils'
import { ROUTES } from '../constants'

type Props = {
  amount?: string,
  type: Array<string>,
  date: string,
  time: string,
  rating: 'good' | 'fair' | 'bad',
  id: string,
  onClickDelete: (id: string) => void
}

export default function LoggingEntry({ amount, type, date, time, rating, id, onClickDelete }: Props) {
  function _spreadFoodTypes() {
    return type.map((t: string, index) => (
      <li key={index}>
        {t}
      </li>
    ))
  }

  return (
    <div
      {...css({
        position: 'relative',
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '0.5rem',
        padding: '0.6rem 0.2rem',
        lineHeight: '1.5rem',
        boxShadow: '1px 1px 3px #ecebeb',
        '& img': {
          width: '1.3rem',
          height: '1.3rem',
          verticalAlign: 'middle',
          marginRight: '0.4rem'
        }
      })}
    >
      <div {...css({
        display: 'flex',
        position: 'relative',
        left: '0.5rem',
        marginRight: '0.6rem'
      })}>
        {getLogPrefixEmoji(time, rating)}
      </div>
      <ul {...css({ fontSize: '0.9rem' })}>
        {_spreadFoodTypes()}
      </ul>
      <div {...css({
        display: 'flex',
        alignItems: 'start',
        whiteSpace: 'nowrap',
        fontSize: '0.7rem'
      })}>
        <span {...css({ marginRight: '2rem' })}>{`(${transfromDateString(date)})`}</span>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          iconStyle={{ fill: '#b7b7b7', padding: '0' }}
          style={{
            // a hack to counter the padding-top of the icon button
            position: 'absolute',
            top: '0px', right: '0'
          }}
        >
          <Link to={ROUTES.logging.editLink(id)}>
            <MenuItem primaryText="Edit" />
          </Link>
          <MenuItem primaryText="Delete" onClick={() => onClickDelete(id)}/>
        </IconMenu>
      </div>
    </div>
  )
}

function getLogPrefixEmoji(time: string, rating: 'good' | 'fair' | 'bad'): Array<any> {
  return [getTimePeriodEmoji(time), getRatingEmoji(rating)]
}
