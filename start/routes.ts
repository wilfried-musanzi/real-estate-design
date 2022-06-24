import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/admin', 'AdminControllers/AdminProperty.index').as('admin')
Route.get('/admin/property/new', 'AdminControllers/AdminProperty.view').as('admin-property.new')
Route.post('/admin/property/new', 'AdminControllers/AdminProperty.addNew')
Route.get('/admin/property/edit/:id', 'AdminControllers/AdminProperty.show').as(
  'admin-property.edit'
)
Route.post('/admin/property/edit/:id', 'AdminControllers/AdminProperty.edit')
Route.post('/admin/property/delete/:id', 'AdminControllers/AdminProperty.delete').as(
  'admin-property.delete'
)
