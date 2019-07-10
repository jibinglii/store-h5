export default [{
  path: 'ads',
  name: 'ad.list',
  meta: {
      requiresAuth: true
  },
  component: () =>
      import ('./AdList')
},
{
  path: 'ads/add',
  name: 'ad.add',
  meta: {
      requiresAuth: true
  },
  component: () =>
      import ('./AdAdd')
}
]
