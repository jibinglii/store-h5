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
},
{
  path: 'seller/orders/:order.html',
  name: 'seller/orders/view',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./order-view')
}
]
