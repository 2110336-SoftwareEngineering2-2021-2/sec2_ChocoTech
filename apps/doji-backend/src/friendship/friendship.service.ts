import { FriendRequest, friendRequestStatus } from '@backend/entities/FriendRequest'
import { User } from '@backend/entities/User'
import { FriendDTO } from '@backend/friendship/friendship.dto'
import { IFriendRequestResponseDTO, IUser, IUserReference } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepo: EntityRepository<FriendRequest>,
  ) {}

  //send friend request. condition: no pendind request sent or received
  async sendFriendRequest(sender: IUserReference, receiver: IUserReference) {
    if (this.getRequestTo) {
      throw new Error('request can be sent only once if not cancelled')
    } else if (this.getRequestFrom) {
      throw new Error('there is an existing request from this user')
    } else {
      const friendRequest = new FriendRequest()

      friendRequest.sender = await sender.getUser()
      friendRequest.receiver = await receiver.getUser()

      this.friendRequestRepo.persistAndFlush(friendRequest)
    }
  }

  //receiver call to response  friend request
  async responseFriendRequest(dto: IFriendRequestResponseDTO) {
    const friendRequest = await this.friendRequestRepo.findOne({
      id: dto.id,
    })
    if (dto.accept) {
      //update friend request status
      friendRequest.status = friendRequestStatus.ACCEPTED

      //add friend to user friends property
      const sender = friendRequest.sender
      const receiver = friendRequest.receiver
      sender.friends.add(receiver)
      receiver.friends.add(sender)

      //update database
      this.userRepo.persistAndFlush(sender)
      this.userRepo.persistAndFlush(receiver)
    } else {
      //update friend request status
      friendRequest.status = friendRequestStatus.REJECTED
    }
    //update friendrequest property dateResponded
    friendRequest.dateResponded = new Date(Date.now())
    this.friendRequestRepo.persistAndFlush(friendRequest)
  }

  async cancelFriendRequest(id: string) {
    const friendRequest = await this.friendRequestRepo.findOne({ id: id })
    friendRequest.status = friendRequestStatus.CANCELLED
  }

  async unFriend(me: IUserReference, them: IUserReference) {
    const user1 = await me.getUser()
    const user2 = await them.getUser()
    let friendRequest = await this.friendRequestRepo.findOne({
      sender: { username: user1.username },
      receiver: { username: user2.username },
      status: friendRequestStatus.ACCEPTED,
    })
    if (!friendRequest) {
      friendRequest = await this.friendRequestRepo.findOne({
        sender: { username: user2.username },
        receiver: { username: user1.username },
        status: friendRequestStatus.ACCEPTED,
      })
    }
    friendRequest.status = friendRequestStatus.ENDED

    user1.friends.remove(user2)
    user2.friends.remove(user1)

    this.userRepo.persistAndFlush(user1)
    this.userRepo.persistAndFlush(user2)
    this.friendRequestRepo.persistAndFlush(friendRequest)
  }

  async getFriends(userRef: IUserReference): Promise<FriendDTO[]> {
    const user = await userRef.getUser()
    const friends = user.friends
    return friends.toArray().map((f) => {
      const friend = new FriendDTO()
      friend.username = f.username
      return friend
    })
  }

  //see if I have sent friend request to a user
  async getRequestTo(me: IUserReference, them: IUserReference) {
    const sender = await me.getUser()
    const receiver = await them.getUser()
    return this.friendRequestRepo.findOne({
      sender: { username: sender.username },
      receiver: { username: receiver.username },
      status: friendRequestStatus.PENDING,
    })
  }

  //see if there's a friend request sent to me from a user
  async getRequestFrom(me: IUserReference, them: IUserReference) {
    return this.getRequestTo(them, me)
  }

  async getFriendRequests(me: IUserReference) {
    const user = await me.getUser()
    return this.friendRequestRepo.findAll({
      receiver: { username: user.username },
      status: friendRequestStatus.PENDING,
    })
  }
}
