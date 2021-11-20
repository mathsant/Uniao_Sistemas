import Route from '@ioc:Adonis/Core/Route'

Route.resource('/cars', 'CarsController').apiOnly()
