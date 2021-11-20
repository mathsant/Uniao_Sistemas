import Route from '@ioc:Adonis/Core/Route'

Route.resource('/services', 'ServicesController').apiOnly()
