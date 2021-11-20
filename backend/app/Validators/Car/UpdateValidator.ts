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

  public messages = {}
}
