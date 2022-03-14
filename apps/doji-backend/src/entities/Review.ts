import { IReview } from '@libs/api'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Review implements IReview {
  @PrimaryKey()
  id!: number

  @Property()
  content: string

  @Property()
  rating: number
}
