export default [{
        path: 'distribution/distribution',
        name: 'distribution.distribution',
        component: () =>
            import ('../distribution/distribution')
    },
    {
        path: 'distribution/distributor',
        name: 'distribution.distributor',
        component: () =>
            import ('../distribution/distributor')
    },
    {
        path: 'distribution/distributormanage',
        name: 'distribution.distributormanage',
        component: () =>
            import ('../distribution/distributorManage')
    },
    {
        path: 'distribution/distributionproducts',
        name: 'distribution.distributionproducts',
        component: () =>
            import ('../distribution/distributionProducts')
    },
    {
        path: 'distribution/distributionstatus',
        name: 'distribution.distributionstatus',
        component: () =>
            import ('../distribution/distributionStatus')
    },
    {
        path: 'distribution/distributionGoods',
        name: 'distribution.distributionGoods',
        component: () =>
            import ('../distribution/distributionGoods')
    }
]