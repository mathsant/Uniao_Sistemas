import Route from '@ioc:Adonis/Core/Route'

Route.resource('/providers', 'ProvidersController').apiOnly()