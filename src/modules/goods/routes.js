export default [{
        path: 'goods/:goods.html',
        name: 'goods.view',
        component: () =>
            import ('./goods')
    },
    {
        path: 'goods/operatestatus',
        name: 'goods.operatestatus',
        component: () =>
            import ('../goods/operateStatus')
    }
]