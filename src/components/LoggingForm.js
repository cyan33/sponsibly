// @flow
import React, { useState, useEffect } from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import DateRangeIcon from 'material-ui/svg-icons/action/date-range'
import SaveIcon from 'material-ui/svg-icons/content/save'
import CancelIcon from 'material-ui/svg-icons/av/not-interested'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormInput from './FormInput'
import FormDatePicker from './FormDatePicker'
import FormSection from './FormSection'
import FormButton from './FormButton'
import LoadingSpinner from './LoadingSpinner'
import {MATERIAL} from '../theme'
import { ROUTES } from '../constants'
import { Log } from '../types'

type Props = {
  history: any,
  saveFn: (record: Log) => Promise<any>,
  deleteFn: (id: string) => Promise<any>,
  getRecord: (id: string) => Promise<any>,
  id: string
}

export default function LoggingForm<Props>(props) {
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);

  // log
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('groceries');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const { id, getRecord } = props;
    if (id) {
      setIsFetching(true);
      getRecord(id).then((log) => {
        const {date, description, category, amount} = log;
        setIsFetching(false);
        setDate(date);
        setDescription(description);
        setCategory(category);
        setAmount(amount);
      });
    }
  }, []);

  const deleteRecord = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { deleteFn, history, id } = props;
    
    if (!hasConfirmedDeletion) {
      setHasConfirmedDeletion(true);
    } else {
      setIsSaving(true);
      deleteFn(id).then(() => {
        history.push(ROUTES.logging.list);
      });
    }
  }

  const onDateChange = (e: SyntheticEvent<HTMLInputElement>, date: Date) => {
    setDate(date);
  }

  const onAmountChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  }

  const onDescriptionChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  }

  async function onSubmit(e: SyntheticEvent<*>): void {
    e.preventDefault()
    const { saveFn, history } = props

    setIsSaving(true);
    await saveFn({
      amount,
      category,
      date,
      description,
    });
    history.push(ROUTES.logging.list);
  }

  const { id } = props

  if (isSaving || isFetching) {
    return <LoadingSpinner />
  }

  return (
    <form onSubmit={onSubmit}>
      <FormSection direction="row" additionalStyle={{ alignItems: 'center' }}>
        <DateRangeIcon style={{ width: '1.6rem', height: '1.6rem', marginRight: '0.4rem' }}/>
        <FormDatePicker
          value={date}
          onChange={onDateChange}
        />
      </FormSection>
      <FormSection>
        <div {...css({ display: 'flex', alignItems: 'center', marginBottom: 10 })}>
          Category
        </div>
        <Select
          labelId="demo-simple-select-label"
          value={category}
          onChange={() => {}}
          underlineStyle={MATERIAL.textField.underlineStyle}
          underlineFocusStyle={MATERIAL.textField.underlineFocusStyle}
        >
          <MenuItem value="groceries">Groceries</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="renting">Renting</MenuItem>
        </Select>
      </FormSection>
      <FormSection>
        <div>Description</div>
        <FormInput
          onChange={onDescriptionChange}
          value={description}
          hintText="(optional)"
        />
      </FormSection>
      <FormSection>
        <div>Amount</div>
        <FormInput
          onChange={onAmountChange}
          value={amount}
        />
      </FormSection>
      <FormSection>
        <FormButton
          background="#66bb6a"
          disabled={category == null || amount == null}
        >
          <SaveIcon />
          <span>Save</span>
        </FormButton>
        {
          id &&
          <FormButton 
            onClick={deleteRecord}
            background="#e57373"
          >
            <DeleteIcon />
            <span>{hasConfirmedDeletion ? 'Are you sure?' : 'Delete'}</span>
          </FormButton>
        }
        <Link to={ROUTES.logging.list}>
          <FormButton 
            background="#bdbdbd"
          >
            <CancelIcon />
            <span>Cancel</span>
          </FormButton>
        </Link>
      </FormSection>
    </form>
  );
}
