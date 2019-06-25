export default [{
  path: 'result/:status/:id?',
  name: 'result',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./result')
}]
