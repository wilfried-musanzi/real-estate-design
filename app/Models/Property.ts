import Category from 'App/Models/Category'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string | null

  @column()
  public description: string | null

  @column()
  public town: string | null

  @column()
  public price: number

  @column()
  public surface: number

  @column()
  public thumb: string | null

  @column()
  public reserved: boolean

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public categoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
