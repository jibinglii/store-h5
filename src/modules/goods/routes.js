export default [{
    path: 'goods/:goods.html',
    name: 'goods.view',
    component: () =>
      import('./goods')
  },
  {
    path: 'confirm/:goods.html',
    name: 'confirm',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./confirm')
  },
  {
    path: 'pay/:order.html',
    name: 'pay.type',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./pay')
  },
  {
    path: 'pay-bank/:order.html',
    name: 'pay.bank',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./DCPay')
  },
  {
    path: 'goods/add',
    name: 'goods.add',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./add')
  },
  {
    path: 'goods/add/game.html',
    name: 'goods.add.game',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./SelectGame')
  },
  {
    path: 'goods/add/game-basic/:id.html',
    name: 'goods.add.game.basic',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./AddGameBasic')
  },
  {
    path: 'goods/add/game-info/:id.html',
    name: 'goods.add.game.info',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./AddGameInfo')
  }, {
    path: 'goods/add/game-spec/:id.html',
    name: 'goods.add.game.spec',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./AddGameSpec')
  },
  {
    path: 'goods/edit/game-info/:id.html',
    name: 'goods.edit.game.info',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./EditGameInfo')
  },
  {
    path: 'goods/edit/game-spec/:id.html',
    name: 'goods.edit.game.spec',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./EditGameSpec')
  },
  {
    path: 'goods/sort/select.html',
    name: 'goods.goodsort',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('./goodSort')
  },
]
