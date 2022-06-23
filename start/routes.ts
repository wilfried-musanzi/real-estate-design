import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/admin', 'AdminController/AdminProperty.index').as('admin')
Route.get('/admin/property/new', 'AdminController/AdminProperty.newView').as('admin-property.new')
Route.post('/admin/property/new', 'AdminController/AdminProperty.addNew')
Route.get('/admin/property/edit/:id', 'AdminController/AdminProperty.edit').as(
  'admin-property.edit'
)
Route.post('/admin/property/edit/:id', 'AdminController/AdminProperty.edit')
