export default [{
        path: 'distribution/distribution',
        name: 'distribution.distribution',
        component: () =>
            import ('../distribution/distribution')
    },
    {
        path: 'distribution/distributoritem',
        name: 'distribution.distributoritem',
        component: () =>
            import ('../distribution/distributorItem')
    },
    {
        path: 'distribution/distributionmanage',
        name: 'distribution.distributionmanage',
        component: () =>
            import ('../distribution/distributionManage')
    },
    {
        path: 'distribution/distributionstatus',
        name: 'distribution.distributionstatus',
        component: () =>
            import ('../distribution/distributionStatus')
    },
    {
        path: 'distribution/distributorstatusitem',
        name: 'distribution.distributorstatusitem',
        component: () =>
            import ('../distribution/distributorStatusItem')
    }
]