export type Log = {
  $category?: string,
  amount?: string,
  date: string,
  expense?: string,
  rating: 'good' | 'fair' | 'bad',
  time: string,
  type: Array<string>,
  user: string
}

export type User = {
  id?: string
}

export type LoginType = 'github' | 'twitter'
