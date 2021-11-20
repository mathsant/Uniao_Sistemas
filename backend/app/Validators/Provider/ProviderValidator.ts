import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProviderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }),
    email: schema.string({ trim: true, escape: true }, [rules.email()]),
    phone: schema.string({ trim: true, escape: true }),
  })

  public messages = {
    'name.required': 'O nome é obrigatorio!',
    'email.required': 'O email é obrigatorio!',
    'phone.required': 'O telefone é obrigatorio!',
    'email': 'O e-mail não é válido!',
  }
}
