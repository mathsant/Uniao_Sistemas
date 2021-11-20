import Route from '@ioc:Adonis/Core/Route'

Route.resource('/customers', 'CustomersController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
