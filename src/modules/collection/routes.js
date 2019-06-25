export default [
  {
    path: 'collection/collection',
    name: 'collection.collection',
    meta: {
      requiresAuth: true
    },
    component: () => import('./collection')
  }
]
