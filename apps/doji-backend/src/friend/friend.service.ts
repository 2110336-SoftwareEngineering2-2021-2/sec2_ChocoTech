/* eslint-disable no-useless-catch */
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

import { FriendRequest, FriendRequestStatus } from '@backend/entities/FriendRequest'
import { Friendship } from '@backend/entities/Friendship'
import { User } from '@backend/entities/User'
import { IUserReference } from '@backend/types'

import { RelationshipStatus } from '@libs/api'

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepo: EntityRepository<FriendRequest>,
    @InjectRepository(Friendship) private readonly friendshipRepo: EntityRepository<Friendship>,
  ) {}

  async getAllFriends(userRef: IUserReference) {
    // eslint-disable-next-line no-useless-catch
    try {
      const friendship = (await userRef.getUser()).friendship
      return friendship.getItems().map((f) => {
        const friend = f.user2
        return {
          username: friend.username,
          displayName: friend.displayName,
          profilePictureURL: friend.profilePictureURL,
        }
      })
    } catch (e) {
      throw e
    }
  }

  async getRelationship(userRef: IUserReference, username: string): Promise<RelationshipStatus> {
    try {
      const user = await userRef.getUser()
      const requestSent = user.requestSent.getItems().map((fr) => fr.receiver.username)
      const requestReceived = user.requestReceived.getItems().map((fr) => fr.sender.username)
      const friendships = user.friendship.getItems().map((f) => f.user2.username)
      if (friendships.includes(username)) {
        return RelationshipStatus.FRIEND
      }
      if (requestSent.includes(username)) {
        return RelationshipStatus.CAN_CANCEL_REQUEST
      }
      if (requestReceived.includes(username)) {
        return RelationshipStatus.CAN_RESPOND_REQUEST
      }
      return RelationshipStatus.UNRELATED
    } catch (e) {
      throw e
    }
  }
  /*
  async getAllRequestSent(userRef: IUserReference) {
    return
  }
  */
  async getAllRequestReceived(userRef: IUserReference) {
    try {
      const user = await userRef.getUser()
      const requestReceived = user.requestReceived.getItems().map((fr) => {
        const sender = fr.sender
        return {
          id: fr.id,
          dateSent: fr.dateSent,
          username: sender.username,
          displayname: sender.displayName,
          profilePictureURL: sender.profilePictureURL,
        }
      })
      return requestReceived
    } catch (e) {
      throw e
    }
  }

  async sendFriendRequest(userRef: IUserReference, username: string) {
    try {
      const relationship = await this.getRelationship(userRef, username)
      if (relationship == RelationshipStatus.UNRELATED) {
        const sender = await userRef.getUser()
        const receiver = await this.userRepo.findOne({ username: username })
        const friendRequest = new FriendRequest(sender, receiver)
        this.friendRequestRepo.persistAndFlush(friendRequest)
      }
    } catch (e) {
      throw e
    }
  }

  async cancelFriendRequest(userRef: IUserReference, id: string) {
    try {
      const friendRequest = await this.friendRequestRepo.findOne({ id: id })
      const user = await userRef.getUser()
      if (friendRequest) {
        if (friendRequest.sender == user) {
          this.friendRequestRepo.removeAndFlush(friendRequest)
        }
      }
    } catch (e) {
      throw e
    }
  }

  async respondFriendRequest(userRef: IUserReference, requestID: string, accept: boolean) {
    try {
      const friendRequest = await this.friendRequestRepo.findOne({ id: requestID })
      const user = await userRef.getUser()
      if (friendRequest) {
        if (friendRequest.receiver == user) {
          friendRequest.dateRespond = new Date()
          if (accept) {
            //accept friend request
            friendRequest.status = FriendRequestStatus.ACCEPTED
            const sender = friendRequest.sender
            const receiver = friendRequest.receiver
            const friendship_1 = new Friendship(friendRequest.id, sender, receiver)
            const friendship_2 = new Friendship(friendRequest.id, receiver, sender)
            this.friendshipRepo.persistAndFlush([friendship_1, friendship_2])
          } else {
            friendRequest.status = FriendRequestStatus.REJECTED
          }
        }
      }
    } catch (e) {
      throw e
    }
  }

  async unfriend(userRef: IUserReference, username: string) {
    try {
      const user1 = await userRef.getUser()
      const user2 = await this.userRepo.findOne({ username: username })
      const relationship = await this.getRelationship(userRef, username)
      if (relationship == RelationshipStatus.FRIEND) {
        const friendship_1 = await this.friendshipRepo.findOne({
          user1: { username: user1.username },
          user2: { username: user2.username },
        })
        const friendship_2 = await this.friendshipRepo.findOne({
          user1: { username: user2.username },
          user2: { username: user1.username },
        })
        const friendRequest = await this.friendRequestRepo.findOne({ id: friendship_1.id })
        friendRequest.status = FriendRequestStatus.UNFRIENDED
        friendRequest.dateEnded = new Date()

        this.friendRequestRepo.persistAndFlush(friendRequest)
        this.friendshipRepo.removeAndFlush([friendship_1, friendship_2])
      }
    } catch (e) {
      throw e
    }
  }
}
