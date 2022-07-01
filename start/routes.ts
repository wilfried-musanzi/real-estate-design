import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home')
Route.get('/login', 'Auth/Auth.loginView').as('login')
Route.post('/login', 'Auth/Auth.login')
Route.get('/logout', 'Auth/Auth.logout').as('logout')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'Admin/Dashboard.index').as('admin')
    Route.group(() => {
      Route.get('/', 'Admin/Property.index').as('property.index')
      Route.get('/new', 'Admin/Property.createView').as('property.new')
      Route.post('/new', 'Admin/Property.create')
      Route.get('/edit/:id', 'Admin/Property.updateView').as('property.edit')
      Route.post('/edit/:id', 'Admin/Property.update')
      Route.delete('/delete/:id', 'Admin/Property.delete').as('property.delete')
    }).prefix('/property')

    Route.group(() => {
      Route.get('/', 'Admin/Category.index').as('category.index')
      Route.get('/new', 'Admin/Category.view').as('category.new')
      Route.post('/new', 'Admin/Category.addNew')
      Route.get('/edit/:id', 'Admin/Category.show').as('category.edit')
      Route.post('/edit/:id', 'Admin/Category.edit')
      Route.post('/delete/:id', 'Admin/Category.delete').as('category.delete')
    }).prefix('/category')
  }).prefix('/admin')
}).middleware(['auth', 'secureBackend'])
