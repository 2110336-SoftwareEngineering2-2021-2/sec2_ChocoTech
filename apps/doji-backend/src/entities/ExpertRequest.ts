import { Entity, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core'

import { User } from './User'

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity()
export class ExpertRequest {
  @PrimaryKey()
  id: number
  @OneToOne()
  @Unique()
  expertUser!: User
  @Property()
  applicationContent: string
  @Property()
  status: RequestStatus = RequestStatus.PENDING
  @Property()
  requestDate: Date = new Date()
}
