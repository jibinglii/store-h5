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
    {
        path: 'me/accountsetting',
        name: 'me.accountsetting',
        component: () =>
            import ('../me/accountSetting')
    },
    {
        path: 'me/modifyuseinfo',
        name: 'me.modifyuseinfo',
        component: () =>
            import ('../me/modifyUseInfo')
    },
]