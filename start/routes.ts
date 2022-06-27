import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/admin', 'AdminControllers/AdminDashboard.index').as('admin')

// Admin Property
Route.get('/admin/property', 'AdminControllers/AdminProperty.index').as('admin-property.index')
Route.get('/admin/property/new', 'AdminControllers/AdminProperty.createView').as(
  'admin-property.new'
)
Route.post('/admin/property/new', 'AdminControllers/AdminProperty.create')
Route.get('/admin/property/edit/:id', 'AdminControllers/AdminProperty.updateView').as(
  'admin-property.edit'
)
Route.post('/admin/property/edit/:id', 'AdminControllers/AdminProperty.update')
Route.delete('/admin/property/delete/:id', 'AdminControllers/AdminProperty.delete').as(
  'admin-property.delete'
)

// Admin Categories
Route.get('/admin/category/', 'AdminControllers/AdminCategory.index').as('admin-category.index')
Route.get('/admin/category/new', 'AdminControllers/AdminCategory.view').as('admin-category.new')
Route.post('/admin/category/new', 'AdminControllers/AdminCategory.addNew')
Route.get('/admin/category/edit/:id', 'AdminControllers/AdminCategory.show').as(
  'admin-category.edit'
)
Route.post('/admin/category/edit/:id', 'AdminControllers/AdminCategory.edit')
Route.post('/admin/category/delete/:id', 'AdminControllers/AdminCategory.delete').as(
  'admin-category.delete'
)
