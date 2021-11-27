import Route from '@ioc:Adonis/Core/Route'

Route.resource('/collaborators', 'CollaboratorsController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
    index: ['auth'],
  })
