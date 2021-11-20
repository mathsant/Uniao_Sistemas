import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cars extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('board').notNullable().unique()
      table
        .enum('brand', [
          'FIAT',
          'VOLKSWAGEN',
          'CHEVROLET',
          'HYUNDAY',
          'TOYOTA',
          'JEEP',
          'RENAULT',
          'HONDA',
          'NISSAN',
          'FORD',
        ])
        .notNullable()
      table.string('model').notNullable()
      table.integer('year').notNullable()
      table.string('color').notNullable()
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
