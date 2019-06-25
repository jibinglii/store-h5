export default [{
  path: 'bank/list',
  name: 'banks',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./list')
},
{
  path: 'bank/add',
  name: 'banks.add',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./add')
},
{
  path: 'bank/view/:id.html',
  name: 'banks.view',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./view')
},
]
