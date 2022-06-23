import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/admin', 'AdminController/admin.index').as('admin')
