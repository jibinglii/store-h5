export default [{
        path: 'me/me',
        name: 'me.me',
        component: () =>
            import ('../me/me')
    },
    {
        path: 'me/storemanage',
        name: 'me.storemanage',
        component: () =>
            import ('../me/storeManage')
    },
]