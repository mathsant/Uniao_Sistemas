import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import { StoreValidator, UpdateValidator } from 'App/Validators/Customer'

export default class CustomersController {
  public async index({}: HttpContextContract) {
    const customers = await Customer.query().orderBy('id', 'asc')
    return customers
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const customer = await Customer.create(data)
    return customer
  }

  public async show({ params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)
    return customer
  }

  public async update({ params, request }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    customer.merge(data)
    await customer.save()
    return customer
  }

  public async destroy({ params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)
    await customer.delete()
  }
}
