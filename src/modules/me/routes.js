export default [{
        path: 'me/me',
        name: 'me.me',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./me')
    },
    {
        path: 'me/storemanage',
        name: 'me.storemanage',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./storeManage')
    },
    {
        path: 'me/accountsetting',
        name: 'me.accountsetting',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./accountSetting')
    },
    {
        path: 'me/modifyuseinfo',
        name: 'me.modifyuseinfo',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./modifyUseInfo')
    },
    {
        path: 'me/edit-pay-pwd',
        name: 'me.edit-pay-pwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./EditPayPwd')
    },
    {
        path: 'me/set-pay-pwd',
        name: 'me.set-pay-pwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./SetPayPwd')
    },
    {
        path: 'me/opp',
        name: 'me.opp',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./Opp')
    },
    {
        path: 'me/help',
        name: 'me.helps',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./Help')
    },
    {
        path: 'me/help/view/:id.html',
        name: 'me.helps.view',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./HelpInfo')
    },
    {
        path: 'me/help/list/:id.html',
        name: 'me.helps.list',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./HelpList')
    },
    {
        path: 'me/help/feedback.html',
        name: 'me.feedback',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./Feedback')
    },
    {
        path: 'store/setting.html',
        name: 'store.setting',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./StoreSetting')
    },
    {
        path: 'me/settlemanage',
        name: 'me.settlemanage',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./settleManage')
    },
]