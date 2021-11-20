import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }),
    email: schema.string({ trim: true, escape: true }, [rules.email()]),
    phone: schema.string({ trim: true, escape: true }),
    address: schema.string({ trim: true, escape: true }),
    cpf: schema.string({ trim: true, escape: true }),
  })

  public messages = {
    required: 'O {{ field }} é obrigatorio',
    email: 'O e-mail não é válido!',
  }
}
