import Route from '@ioc:Adonis/Core/Route'

Route.resource('/collaborators', 'CollaboratorsController').apiOnly()
