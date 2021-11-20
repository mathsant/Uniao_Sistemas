import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'
import { StoreValidator, UpdateValidator } from 'App/Validators/Car'

export default class CarsController {
  public async index({}: HttpContextContract) {
    const cars = await Car.query().orderBy('id', 'asc').preload('customer')
    return cars
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const car = await Car.create(data)
    return car
  }

  public async show({ params }: HttpContextContract) {
    const car = await Car.findOrFail(params.id)

    return car
  }

  public async update({ params, request }: HttpContextContract) {
    const car = await Car.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    car.merge(data)
    await car.save()
    return car
  }

  public async destroy({ params }: HttpContextContract) {
    const car = await Car.findOrFail(params.id)
    await car.delete()
  }
}
