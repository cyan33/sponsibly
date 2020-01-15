// @flow
// $ExpectError useState hasn't been typed yet
import React, { useState } from 'react'
import { css } from 'glamor'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { ROUTES } from '../constants'
import { Log } from '../types'
import CreateLink from './CreateLink'
import LoadingSpinner from './LoadingSpinner'
import LoggingEntry from './LoggingEntry'

type Props = {
  logs: Array<Log> | null,
  deleteFn: (id: string) => Promise<any>
}

type State = {
  isFetching: boolean,
  isDialogOpen: boolean,
  toDeleteLogId: string,
}

// why does pure function component not updating itself after `logs` change?
export default function LoggingList(props: Props) {
  const [listState: State, setListState] = useState({
    isFetching: false,
    isDialogOpen: false,
    toDeleteLogId: '',
  })

  const onDialogOpen = (id: string) => {
    setListState({ 
      isDialogOpen: true,
      toDeleteLogId: id,
    })
  }

  const onDialogClose = () => {
    setListState({
      isDialogOpen: false,
      toDeleteLogId: '',
    })
  }

  const deleteLog = () => {
    const { deleteFn } = props
    const { toDeleteLogId } = listState

    setListState({ isFetching: true })

    deleteFn(toDeleteLogId).then(() => {
      setListState({ 
        isFetching: false,
        isDialogOpen: false,
      })
    })
  }

  const { logs } = props
  const { isFetching } = listState

  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={onDialogClose}
      style={{ color: '#4caf50' }}
    />,
    <FlatButton
      label="Delete"
      primary={true}
      keyboardFocused={true}
      onClick={deleteLog}
      style={{ color: '#4caf50' }}
    />,
  ]

  if (isFetching || logs === null) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <div {...css({
      boxSizing: 'border-box',
      padding: '1.4rem',
      height: '100%',
      backgroundColor: '#f5f5f5',
      overflow: 'scroll'
    })}>
      {(logs && logs.length === 0) && 
        <div {...css({
          color: '#9e9e9e',
          lineHeight: '1.5rem',
        })}>
          You don't have any log record at this time, try click the add button and start meal tracking!
        </div>
      }
      {logs &&
        <ul>
          {
            logs.map((log, i) => (
              <LoggingEntry 
                {...log}
                key={i}
                onClickDelete={onDialogOpen}
              />
            ))
          }
        </ul>
      }
      <CreateLink to={ROUTES.logging.new} />
      <Dialog
        title="Are you sure?"
        actions={actions}
        modal={false}
        open={listState.isDialogOpen}
        onRequestClose={onDialogClose}
      >
        Removed log can not be restored.
      </Dialog>
    </div>
  )
}
