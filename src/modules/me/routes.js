export default [{
  path: 'me/me',
  name: 'me.me',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./me')
},
{
  path: 'me/storemanage',
  name: 'me.storemanage',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./storeManage')
},
{
  path: 'me/accountsetting',
  name: 'me.accountsetting',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./accountSetting')
},
{
  path: 'me/modifyuseinfo',
  name: 'me.modifyuseinfo',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./modifyUseInfo')
},
{
  path: 'me/edit-pay-pwd',
  name: 'me.edit-pay-pwd',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./EditPayPwd')
},
{
  path: 'me/set-pay-pwd',
  name: 'me.set-pay-pwd',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import('./SetPayPwd')
},
]
