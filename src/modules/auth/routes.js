export default [{
    path: 'auth/login',
    name: 'auth.login',
    component: () =>
        import ('./login')
},{
  path: 'oauth',
  name: 'oauth',
  component: () =>
      import ('./oauth')
}]
