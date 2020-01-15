import { emojify } from 'react-emoji'

function addLeadingZero(num) {
  return parseInt(num, 10) > 10 ? num : `0${num}`
}

export function dateToStr(date) {
  // Date => '2018-01-24'
  const year = date.getFullYear()
  const month = addLeadingZero(date.getMonth() + 1)
  const day = addLeadingZero(date.getDate())
  return `${year}-${month}-${day}`
}

export function strToDate(str) {
  // '2018-01-24' => Date
  const splittedDate = str.split('-')
  return new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2])
}

export function timeToStr(date) {
  // Date => '15:33'
  const hours = addLeadingZero(date.getHours())
  const minutes = addLeadingZero(date.getMinutes())
  return `${hours}:${minutes}`
}

export function strToTime(str) {
  if (!str) return
  const date = new Date()
  date.setHours(str.split(':')[0])
  date.setMinutes(str.split(':')[1])
  return date
}

export function getExactTimeStamp(log) {
  return new Date(`${log.date}T${log.time}`).getTime()
}

export function getTimePeriodEmoji(time) {
  const hours = time.split(':')[0]
  if (hours < 10) return emojify(':bread:')
  if (hours < 15) return emojify(':bento:')
  return emojify(':sushi:')
}

export function getRatingEmoji(rating) {
  if (rating === 'good')  return emojify(':smile:')
  if (rating === 'fair')  return emojify(':simple_smile:')
  return emojify(':worried:')
}

export function transfromDateString(date) {
  const splittedDate = date.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return`${months[splittedDate[1] - 1]}. ${splittedDate[2]}`
}
