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
  path: 'distribution/distributoritem',
  name: 'distribution.distributoritem',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributorItem')
},
{
  path: 'distribution/distributionmanage',
  name: 'distribution.distributionmanage',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributionManage')
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
  path: 'distribution/distributorstatusitem',
  name: 'distribution.distributorstatusitem',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../distribution/distributorStatusItem')
}
]
