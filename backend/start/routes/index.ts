import Route from '@ioc:Adonis/Core/Route'
import Provider from 'App/Models/Provider'
import Customer from 'App/Models/Customer'
import Service from 'App/Models/Service'
import './providers'
import './customers'
import './collaborator'
import './cars'
import './services'
import './auth'
import './reports'

Route.get('/', async () => {
  const countProviers = await Provider.query()
  const countCustomers = await Customer.query()
  const countServices = await Service.query()
  const amountProviders = countProviers.length
  const amountCustomers = countCustomers.length
  const amountServices = countServices.length
  return {
    amountProvider: amountProviders,
    amountCustomers: amountCustomers,
    amountServices: amountServices,
  }
})

Route.get('/report-test', async ({ view }) => {
  return view.render('home')
})
