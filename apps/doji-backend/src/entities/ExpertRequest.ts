import { Entity, OneToOne, Property } from '@mikro-orm/core'

import { User } from './User'

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity()
export class ExpertRequest {
  @OneToOne({ orphanRemoval: true, primary: true })
  expertUser: User
  @Property()
  applicationContent: string
  @Property()
  status: RequestStatus = RequestStatus.PENDING
  @Property()
  field: string
  @Property()
  requestDate: Date = new Date()
}
