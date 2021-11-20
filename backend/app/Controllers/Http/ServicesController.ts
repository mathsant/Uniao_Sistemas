import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  public async index({}: HttpContextContract) {
    const services = await Service.query().orderBy('id').preload('car').preload('collaborator')
    return services
  }

  public async store({ request }: HttpContextContract) {
    // const data = await request.validate(ServiceValidator)
    const data = request.only(['value', 'describe', 'car_id', 'collaborator_id', 'date', 'status'])
    const service = await Service.create(data)

    return service
  }

  public async show({ params }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)
    return service
  }

  public async update({ params, request }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)
    const data = request.only(['value', 'describe', 'car_id', 'collaborator_id', 'status'])
    service.merge(data)
    await service.save()
    return service
  }

  public async destroy({ params }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)
    service.delete()
  }
}
