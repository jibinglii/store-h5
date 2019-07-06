export default [{
    path: 'contact',
    name: 'contact',
    meta: {
      requiresAuth: true
  },
    component: () =>
        import ('./Contact')
}]
