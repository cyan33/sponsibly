// @flow
import React, { Component } from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import AddIcon from 'material-ui/svg-icons/av/playlist-add'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import DateRangeIcon from 'material-ui/svg-icons/action/date-range'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'
import SaveIcon from 'material-ui/svg-icons/content/save'
import CancelIcon from 'material-ui/svg-icons/av/not-interested'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormInput from './FormInput'
import FormDatePicker from './FormDatePicker'
import FormTimePicker from './FormTimePicker'
import FormSection from './FormSection'
import FormButton from './FormButton'
import LoadingSpinner from './LoadingSpinner'
import {MATERIAL} from '../theme'
import { ROUTES } from '../constants'
import { Log } from '../types'
import { dateToStr, strToDate, timeToStr, strToTime, getRatingEmoji } from '../utils'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
});

type Props = {
  history: any,
  saveFn: (record: Log) => Promise<any>,
  deleteFn: (id: string) => Promise<any>,
  getRecord: (id: string) => Promise<any>,
  id: string
}

type State = {
  hasConfirmedDeletion: boolean,
  isCategoryMenuOpen: boolean,
  isSaving: boolean,
  isFetching: boolean,
  log: Log
}

export default class LoggingForm extends Component<Props, State> {
  state: State = {
    hasConfirmedDeletion: false,
    isCategoryMenuOpen: false,
    isSaving: false,
    isFetching: false,
    log: {
      date: dateToStr(new Date()),
      name: '',
      category: '',
      amount: '',
      type: [''],
    }
  }

  componentDidMount() {
    const { id } = this.props
    if (id) {
      this.setState({ isFetching: true }, () => {
        this._getRecord(id)
      })
    }
  }

  _deleteRecord = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { deleteFn, history, id } = this.props
    const { hasConfirmedDeletion } = this.state
    
    if (!hasConfirmedDeletion) {
      this.setState({ hasConfirmedDeletion: true })
    } else {
      this.setState({ isSaving: true}, () => {
        deleteFn(id).then(() => {
          history.push(ROUTES.logging.list)
        })
      })
    }
  }

  _getRecord = (id: string) => {
    const { getRecord } = this.props
    getRecord(id).then((log) => {
      this.setState({ isFetching: false, log: { ...log, id } })
    })
  }

  _shouldDisableFormControl = () => {
    const { isFetching, isSaving } = this.state
    return Boolean(isFetching || isSaving)
  }

  _hasAtLeastOneType = () => {
    return this.state.log.type.filter((t) => !!t).length > 0
  }

  _changeLog = (key: string, val: string) => {
    this.setState({
      log: {
        ...this.state.log,
        [key]: val
      }
    })
  }

  _normalizeFoodType = (): Promise<void> => {
    const { log } = this.state

    return new Promise((resolve, reject) => {
      this.setState(() => ({
        log: {
          ...log,
          type: log.type.filter((log) => !!log)
        }
      }), () => { resolve() })
    })
  }

  _onDateChange = (e: SyntheticEvent<HTMLInputElement>, date: Date) => {
    this._changeLog('date', dateToStr(date))
  }

  _onTypeChange = (val: string, index: number) => {
    let newTypes = [...this.state.log.type]
    newTypes[index] = val

    this.setState({
      log: {
        ...this.state.log,
        type: newTypes
      }
    })
  }

  _onAmountChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this._changeLog('amount', e.currentTarget.value)
  }

  _onExpenseChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this._changeLog('expense', e.currentTarget.value)
  }

  _onRatingChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this._changeLog('rating', e.currentTarget.value)
  }

  _onSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault()

    const { saveFn, history } = this.props

    this._normalizeFoodType().then(() => {
      this.setState({ isSaving: true }, async () => {
        await saveFn(this.state.log)
        history.push(ROUTES.logging.list)
      })
    })
  }
  _handleCategoryMenuClose = (val) => {
    console.log(val);
  }

  render() {
    const { id } = this.props
    const { log, isSaving, isFetching, hasConfirmedDeletion } = this.state
  
    if (isSaving || isFetching) {
      return <LoadingSpinner />
    }

    return (
      <form onSubmit={this._onSubmit.bind(this)}>
        <FormSection direction="row" additionalStyle={{ alignItems: 'center' }}>
          <DateRangeIcon style={{ width: '1.6rem', height: '1.6rem', marginRight: '0.4rem' }}/>
          <FormDatePicker
            value={strToDate(log.date)}
            onChange={this._onDateChange}
            disabled={this._shouldDisableFormControl()}
          />
        </FormSection>
        <FormSection>
          <div {...css({ display: 'flex', alignItems: 'center', marginBottom: 10 })}>
            Category
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            onChange={() => {}}
            underlineStyle={MATERIAL.textField.underlineStyle}
            underlineFocusStyle={MATERIAL.textField.underlineFocusStyle}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormSection>
        <FormSection>
          <div>Description</div>
          <FormInput
            onChange={this._onAmountChange}
            value={log.amount}
            hintText="(optional)"
            disabled={this._shouldDisableFormControl()}
          />
        </FormSection>
        <FormSection>
          <div>Amount $</div>
          <FormInput
            onChange={this._onExpenseChange}
            value={log.expense}
            disabled={this._shouldDisableFormControl()}
          />
        </FormSection>
        <FormSection>
          <FormButton
            background="#66bb6a"
            disabled={Boolean(!log.rating || !this._hasAtLeastOneType() || this._shouldDisableFormControl())}
          >
            <SaveIcon />
            <span>Save</span>
          </FormButton>
          {
            id &&
            <FormButton 
              onClick={this._deleteRecord}
              background="#e57373"
              disabled={this._shouldDisableFormControl()}
            >
              <DeleteIcon />
              <span>{hasConfirmedDeletion ? 'Are you sure?' : 'Delete'}</span>
            </FormButton>
          }
          <Link to={ROUTES.logging.list}>
            <FormButton 
              background="#bdbdbd"
              disabled={this._shouldDisableFormControl()}
            >
              <CancelIcon />
              <span>Cancel</span>
            </FormButton>
          </Link>
        </FormSection>
      </form>
    )
  }  
}

type RatingProps = {
  rating: 'good' | 'fair' | 'bad',
  value: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void
}
