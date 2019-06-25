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
        path: 'goods/add.html',
        name: 'goods.add',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./add')
    }
]