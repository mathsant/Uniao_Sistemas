import Route from '@ioc:Adonis/Core/Route'

Route.post('/reports/customers', 'ReportsController.customer').middleware(['auth'])
Route.post('/reports/manager', 'ReportsController.manager').middleware(['auth'])
