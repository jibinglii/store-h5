export default [{
        path: 'goods/:goods.html',
        name: 'goods.view',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./goods')
    },
    {
        path: 'confirm/:goods.html',
        name: 'confirm',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./confirm')
    },
    {
        path: 'pay/:order.html',
        name: 'pay.type',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./pay')
    },
    {
        path: 'pay-bank/:order.html',
        name: 'pay.bank',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./DCPay')
    },
    {
        path: 'goods/add',
        name: 'goods.add',
        component: () =>
            import ('./add')
    },
    {
        path: 'goods/goodsort',
        name: 'goods.goodsort',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./goodSort')
    }
]