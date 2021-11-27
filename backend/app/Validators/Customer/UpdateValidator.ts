import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }),
    email: schema.string({ trim: true, escape: true }, [rules.email()]),
    phone: schema.string({ trim: true, escape: true }),
    address: schema.string({ trim: true, escape: true }),
    cpf: schema.string({ trim: true, escape: true }, [
      rules.unique({ table: 'customers', column: 'cpf' }),
    ]),
  })

  public messages = {
    'name.required': 'O nome é obrigatorio!',
    'email.required': 'O e-mail é obrigatorio!',
    'phone.required': 'O telefone é obrigatorio!',
    'address.required': 'O endereço é obrigatorio!',
    'cpf.required': 'O CPF é obrigatorio!',
    'cpf.unique': 'O CPF já está cadastrado!',
    'email': 'O e-mail não é válido!',
  }
}
