import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Provider from 'App/Models/Provider'
import ProviderValidator from 'App/Validators/Provider/ProviderValidator'

export default class ProvidersController {
  public async index({}: HttpContextContract) {
    const providers = await Provider.query().orderBy('id', 'asc')
    return providers
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(ProviderValidator)
    const provider = await Provider.create(data)
    return provider
  }

  public async show({ params }: HttpContextContract) {
    const provider = await Provider.findOrFail(params.id)
    return provider
  }

  public async update({ params, request }: HttpContextContract) {
    const provider = await Provider.findOrFail(params.id)
    const data = await request.validate(ProviderValidator)

    provider.merge(data)
    await provider.save()
    return provider
  }

  public async destroy({ params }: HttpContextContract) {
    const provider = await Provider.findOrFail(params.id)
    await provider.delete()
  }
}
