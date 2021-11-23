import Route from '@ioc:Adonis/Core/Route'

Route.post('/reports/customers', 'ReportsController.customer')
Route.post('/reports/manager', 'ReportsController.manager')
