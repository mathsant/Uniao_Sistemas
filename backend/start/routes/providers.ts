import Route from '@ioc:Adonis/Core/Route'

Route.resource('/providers', 'ProvidersController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
    index: ['auth'],
  })
