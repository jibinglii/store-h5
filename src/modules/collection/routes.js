export default [
  {
    path: 'collection/collection',
    name: 'collection.collection',
    rmeta: {
      requiresAuth: true
    },
    component: () => import('./collection')
  }
]
