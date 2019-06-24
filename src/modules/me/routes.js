export default [{
  path: 'me/me',
  name: 'me.me',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../me/me')
},
{
  path: 'me/storemanage',
  name: 'me.storemanage',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../me/storeManage')
},
{
  path: 'me/accountsetting',
  name: 'me.accountsetting',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../me/accountSetting')
},
{
  path: 'me/modifyuseinfo',
  name: 'me.modifyuseinfo',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('../me/modifyUseInfo')
},
]
