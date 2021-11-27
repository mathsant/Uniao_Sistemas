import Route from '@ioc:Adonis/Core/Route'

Route.resource('/cars', 'CarsController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
    index: ['auth'],
  })
