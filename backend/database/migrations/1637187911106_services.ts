import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Services extends BaseSchema {
  protected tableName = 'services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('value').notNullable()
      table.text('describe', 'longtext').notNullable()
      table
        .integer('car_id')
        .unsigned()
        .references('id')
        .inTable('cars')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('collaborator_id')
        .unsigned()
        .references('id')
        .inTable('collaborators')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.date('date').notNullable()
      table.enum('status', ['ABERTO', 'FINALIZADO', 'CANCELADO']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
