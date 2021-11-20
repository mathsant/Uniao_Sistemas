import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Collaborator from './Collaborator'
import Car from './Car'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public describe: string

  @column()
  public date: Date

  @column()
  public status: string

  @column()
  public carId: string

  @column()
  public collaboratorId: string

  @belongsTo(() => Car, { foreignKey: 'carId' })
  public car: BelongsTo<typeof Car>

  @belongsTo(() => Collaborator, { foreignKey: 'collaboratorId' })
  public collaborator: BelongsTo<typeof Collaborator>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
