import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    board: schema.string({ trim: true, escape: true }),
    brand: schema.string({ trim: true, escape: true }),
    model: schema.string({ trim: true, escape: true }),
    year: schema.number(),
    color: schema.string({ trim: true, escape: true }),
    customer_id: schema.number(),
  })

  public messages = {
    'board.required': 'A placa é obrigatoria!',
    'brand.required': 'A marca é obrigatoria!',
    'model.required': 'O modelo é obrigatorio!',
    'year.required': 'O ano é obrigatorio!',
    'color.required': 'A cor é obrigatoria!',
    'customer_id.required': 'O proprietario é obrigatorio!',
    'board.unique': 'Essa placa já está cadastrada!',
    'customer_id.exists': 'Esse cliente não existe!',
  }
}
