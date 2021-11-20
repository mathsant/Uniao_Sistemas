import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Collaborators extends BaseSchema {
  protected tableName = 'collaborators'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('cpf').notNullable()
      table.date('admission_date').notNullable()
      table.string('phone').notNullable()
      table.string('email').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
