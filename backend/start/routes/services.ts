import Route from '@ioc:Adonis/Core/Route'

Route.resource('/services', 'ServicesController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
    index: ['auth'],
  })
