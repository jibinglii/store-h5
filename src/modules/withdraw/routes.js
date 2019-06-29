export default [{
        path: 'withdraw/withdraw',
        name: 'withdraw.withdraw',
        component: () =>
            import ('./withdraw')
    },
    {
        path: 'withdraw/paypwd',
        name: 'withdraw.paypwd',
        component: () =>
            import ('./payPwd')
    },
    {
        path: 'withdraw/resultdetails',
        name: 'withdraw.resultdetails',
        component: () =>
            import ('./resultDetails')
    }
]