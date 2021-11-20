import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    value: schema.number(),
    describe: schema.string({ trim: true }),
    status: schema.enum(['ABERTO', 'FINALIZADO', 'CANCELADO']),
    car_id: schema.number(),
    collaborator_id: schema.number(),
  })

  public messages = {
    'value.required': 'O valor é obrigatorio!',
    'describe.required': 'A descrição é obrigatoria!',
    'date.required': 'A data é obrigatoria!',
    'status.required': 'O status é obrigatorio!',
    'car_id.required': 'O automóvel é obrigatorio!',
    'collaborator_id.required': 'O colaborador responsavel é obrigatorio!',
    'car_id.exists': 'Esse automóvel não existe!',
    'collaborator_id.exists': 'Esse colaborador não existe!',
    'enum': 'São permitidos apenas os status ABERTO ou FINALIZADO!',
  }
}
