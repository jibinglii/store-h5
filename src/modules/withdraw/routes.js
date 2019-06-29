export default [
  {
        path: 'withdraw/withdraw',
        name: 'withdraw.withdraw',
        meta: {
          requiresAuth: true
      },
        component: () =>
            import ('./withdraw')
    },
    {
        path: 'withdraw/paypwd',
        name: 'withdraw.paypwd',
        meta: {
          requiresAuth: true
      },
        component: () =>
            import ('./payPwd')
    },
    {
        path: 'withdraw/resultdetails',
        name: 'withdraw.resultdetails',
        meta: {
          requiresAuth: true
      },
        component: () =>
            import ('./resultDetails')
    },
    {
      path: 'withdraw/history',
      name: 'withdraw.history',
      meta: {
        requiresAuth: true
    },
      component: () =>
          import ('./history')
  },
]
