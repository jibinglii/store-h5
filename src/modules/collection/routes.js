export default [
  {
    path: '/collection',
    name: 'collection',
    redirect:'/collection/goods',
    component: () => import('./collection'),
    children: [
      {
        path: 'goods',
        name: "collection.goods",
        component: () => import('./goods')
      },
      {
        path: 'shop',
        name: "collection.shop",
        component: () => import('./shop')
      }
    ]
  }
]
