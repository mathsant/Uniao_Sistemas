import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from '../Models/Customer'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public board: string

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public color: string

  @column()
  public customerId: number

  @belongsTo(() => Customer, { foreignKey: 'customerId' })
  public customer: BelongsTo<typeof Customer>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy')
    },
  })
  public updatedAt: DateTime
}
