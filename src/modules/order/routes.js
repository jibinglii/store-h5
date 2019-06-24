export default [{
  path: 'orders',
  name: 'orders',
  rmeta: {
    requiresAuth: true
  },
  component: () =>
    import('./list')
}
]
