export default [{
  path: 'distribution/distribution',
  name: 'distribution.distribution',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distribution')
},
{
  path: 'distribution/distributor',
  name: 'distribution.distributor',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributor')
},
{
  path: 'distribution/distributormanage/:id?',
  name: 'distribution.distributormanage',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributorManage')
},
{
  path: 'distribution/distributionproducts',
  name: 'distribution.distributionproducts',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributionProducts')
},
{
  path: 'distribution/distributionstatus',
  name: 'distribution.distributionstatus',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributionStatus')
},
{
  path: 'distribution/distributionGoods',
  name: 'distribution.distributionGoods',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributionGoods')
}
]
