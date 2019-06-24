export default [{
  path: 'bank/list',
  name: 'banks',
  rmeta: {
    requiresAuth: true
  },
  component: () =>
    import('./list')
},
{
  path: 'bank/add',
  name: 'banks.add',
  rmeta: {
    requiresAuth: true
  },
  component: () =>
    import('./add')
},
]
