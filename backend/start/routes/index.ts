import Route from '@ioc:Adonis/Core/Route'
import Collaborator from 'App/Models/Collaborator'
import Customer from 'App/Models/Customer'
import Service from 'App/Models/Service'
import './providers'
import './customers'
import './collaborator'
import './cars'
import './services'
import './auth'
import './reports'
import './users'

Route.get('/', async () => {
  const countCollaborators = await Collaborator.query()
  const countCustomers = await Customer.query()
  const countServices = await Service.query()
  const amountCollaborators = countCollaborators.length
  const amountCustomers = countCustomers.length
  const amountServices = countServices.length
  return {
    amountCollaborators: amountCollaborators,
    amountCustomers: amountCustomers,
    amountServices: amountServices,
  }
})

Route.get('/report-test', async ({ view }) => {
  return view.render('home')
})
