import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collaborator from 'App/Models/Collaborator'
import { StoreValidator, UpdateValidator } from 'App/Validators/Collaborator'

export default class CollaboratorsController {
  public async index({}: HttpContextContract) {
    const collaborators = Collaborator.query().orderBy('id', 'asc')
    return collaborators
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const collaborator = await Collaborator.create(data)
    return collaborator
  }

  public async show({ params }: HttpContextContract) {
    const collaborator = await Collaborator.findOrFail(params.id)
    return collaborator
  }

  public async update({ params, request }: HttpContextContract) {
    const collaborator = await Collaborator.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    await collaborator.merge(data)
    collaborator.save()
    return collaborator
  }

  public async destroy({ params }: HttpContextContract) {
    const collaborator = await Collaborator.findOrFail(params.id)
    await collaborator.delete()
  }
}
