/* eslint-disable no-useless-catch */
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { wrap } from 'module'

import { FriendRequest, FriendRequestStatus } from '@backend/entities/FriendRequest'
import { Friendship } from '@backend/entities/Friendship'
import { User } from '@backend/entities/User'
import { UsernameDTO } from '@backend/friend/friend.dto'
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
      const userInfo = await this.userRepo.findOne({ username: userRef.username }, ['friendship'])

      await userInfo.friendship.init()
      const friendships = userInfo.friendship.getItems()

      const result = await Promise.all(
        friendships.map(async (f) => {
          const friend = await this.userRepo.findOne({ username: f.user2.username })
          return {
            username: friend.username,
            displayName: friend.displayName,
            profilePictureURL: friend.profilePictureURL,
          }
        }),
      )

      return result
    } catch (e) {
      throw e
    }
  }

  async getRelationship(userRef: IUserReference, username: string): Promise<RelationshipStatus> {
    try {
      const userInfo = await this.userRepo.findOne({ username: userRef.username }, ['friendship'])
      await userInfo.requestSent.init()
      await userInfo.requestReceived.init()
      await userInfo.friendship.init()
      const requestSent = userInfo.requestSent.getItems().map((fr) => fr.receiver.username)
      const requestReceived = userInfo.requestReceived.getItems().map((fr) => fr.sender.username)
      const friendships = userInfo.friendship.getItems().map((f) => f.user2.username)
      if (username == userRef.username) {
        throw console.error('self-referent relationship action undefined')
      }
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
      const userInfo = await this.userRepo.findOne({ username: userRef.username }, [
        'requestReceived',
      ])
      await userInfo.requestReceived.init()
      const requests = userInfo.requestReceived
        .getItems()
        .filter((req) => req.status == FriendRequestStatus.PENDING)
      const result = await Promise.all(
        requests.map(async (fr) => {
          const sender = await this.userRepo.findOne({ username: fr.sender.username })
          return {
            id: fr.id,
            dateSent: fr.dateSent,
            username: sender.username,
            displayname: sender.displayName,
            profilePictureURL: sender.profilePictureURL,
          }
        }),
      )
      return result
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
        return 'successfully sent'
      }
      return 'cannot send friend request'
    } catch (e) {
      throw e
    }
  }

  async cancelFriendRequest(userRef: IUserReference, username: string) {
    try {
      const friendRequest = await this.friendRequestRepo.findOne({
        sender: { username: userRef.username },
        receiver: { username: username },
        status: FriendRequestStatus.PENDING,
      })
      if (friendRequest) {
        this.friendRequestRepo.removeAndFlush(friendRequest)
      }
    } catch (e) {
      throw e
    }
  }

  async respondFriendRequest(userRef: IUserReference, requestID: string, accept: boolean) {
    try {
      const friendRequest = await this.friendRequestRepo.findOne({ id: requestID }, [
        'sender',
        'receiver',
      ])
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
            await this.friendshipRepo.persistAndFlush([friendship_1, friendship_2])
          } else {
            friendRequest.status = FriendRequestStatus.REJECTED
          }
          await this.friendRequestRepo.persistAndFlush(friendRequest)
        }
      }
    } catch (e) {
      throw e
    }
  }
  async addFriendWithoutConfirmation(userRef: IUserReference, dto: UsernameDTO) {
    try {
      const sender = await userRef.getUser()
      const receiver = await this.userRepo.findOne({ username: dto.username })
      const friendship_1 = new Friendship('0000', sender, receiver)
      const friendship_2 = new Friendship('0000', receiver, sender)
      await this.friendshipRepo.persistAndFlush([friendship_1, friendship_2])
    } catch (e) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }
  }
  async unfriend(userRef: IUserReference, username: string) {
    try {
      console.log('unfriend' + userRef.username + username)
      const user1 = await userRef.getUser()
      const user2 = await this.userRepo.findOne({ username: username })
      const relationship = await this.getRelationship(userRef, username)
      if (relationship == RelationshipStatus.FRIEND) {
        const friendship_1 = await this.friendshipRepo.findOne({
          user1: { username: user1.username },
          user2: { username: user2.username },
        })
        console.log(friendship_1)
        const friendship_2 = await this.friendshipRepo.findOne({
          user1: { username: user2.username },
          user2: { username: user1.username },
        })
        console.log(friendship_2)
        const friendRequest = await this.friendRequestRepo.findOne({ id: friendship_1.id })
        console.log(friendRequest)
        friendRequest.status = FriendRequestStatus.UNFRIENDED
        friendRequest.dateEnded = new Date()

        await this.friendRequestRepo.persistAndFlush(friendRequest)
        this.friendshipRepo.remove(friendship_1)
        this.friendshipRepo.remove(friendship_2)
        return await this.friendshipRepo.flush()
      }
    } catch (e) {
      throw e
    }
  }

  async testFunction() {
    return 'unfriend not supported yet'
  }
}
