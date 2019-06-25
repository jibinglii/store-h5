export default [{
  path: 'orders',
  name: 'orders',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./list')
},
{
  path: 'orders/:id.html',
  name: 'orders.view',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./view')
}
]
