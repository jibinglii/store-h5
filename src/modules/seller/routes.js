export default [{
  path: 'seller/goods',
  name: 'seller/goods',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./goods')
},
{
  path: 'seller/orders',
  name: 'seller/orders',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./order')
}
]
