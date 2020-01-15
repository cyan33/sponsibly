export const ROUTES = {
  dashboard: '/dashboard',
  logging: {
    edit: '/logging/edit/:id',
    editLink: (id) => `/logging/edit/${id}`,
    new: '/logging/new',
    list: '/logging/list'
  },
  recipes: {
    edit: '/recipes/edit/:id',
    new: '/recipes/new',
    list: '/recipes/list'
  }
}
