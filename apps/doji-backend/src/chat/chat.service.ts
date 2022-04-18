import { EntityRepository, NotFoundError, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'

import { ChatRoom } from '@backend/entities/ChatRoom'
import { Message } from '@backend/entities/Message'
import { User } from '@backend/entities/User'
import {
  RedisKeyType,
  RedisPubSubTopic,
  generateRedisKey,
  serializeUserReference,
  subscribeRedisPubSub,
} from '@backend/utils/redis'

import {
  ICreateChatRoomRequestDTO,
  IGetAllChatRoomsResponseDTO,
  IGetChatRoomResponseDTO,
  IMessageDTO,
} from '@libs/api'

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name)

  constructor(
    @Inject('Redis') private readonly redis: Redis,
    @Inject('RedisSubscriber') private readonly redisSub: Redis,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(ChatRoom) private readonly chatRoomRepo: EntityRepository<ChatRoom>,
    @InjectRepository(Message)
    private readonly messageRepo: EntityRepository<Message>,
  ) {
    subscribeRedisPubSub(this.redisSub, RedisPubSubTopic.CHAT_MESSAGE_PUBSUB, this.logger)
  }

  async getAllChatrooms(username: string): Promise<IGetAllChatRoomsResponseDTO[]> {
    try {
      const userInfo = await this.userRepo.findOne({ username }, ['chatRooms'])
      const chatRooms = userInfo.chatRooms.getItems()

      const modifiedChatRooms = await Promise.all(
        chatRooms.map(async (chatRoom) => {
          const messages = await this.messageRepo.find(
            { chatRoom: { id: chatRoom.id } },
            { orderBy: { timestamp: 'DESC' }, limit: 1 },
          )
          await chatRoom.participants.init()
          const data = {
            id: chatRoom.id,
            name: chatRoom.name,
            participants: chatRoom.participants.getIdentifiers(),
          }
          if (!messages.length) {
            return {
              ...data,
              lastMessage: null,
            }
          }
          return {
            ...data,
            lastMessage: {
              id: messages[0].id,
              timestamp: messages[0].timestamp,
              message: messages[0].message,
              imageUrl: messages[0].imageUrl,
              author: {
                username: messages[0].author.username,
                profilePictureURL: messages[0].author.profilePictureURL,
              },
            },
          }
        }),
      )

      return modifiedChatRooms
    } catch (err) {
      this.logger.error(err)
      throw new BadRequestException(err.message)
    }
  }

  async getChatroom(roomId: string): Promise<IGetChatRoomResponseDTO> {
    try {
      const chatRoom = await this.chatRoomRepo.findOne({ id: roomId }, [
        'messages',
        'messages.author',
      ])

      if (!chatRoom) {
        throw new NotFoundError(`ChatRoom ${roomId} not found`)
      }

      await chatRoom.participants.init()
      const wrappedChatRoom = wrap(chatRoom).toJSON()

      return {
        ...wrappedChatRoom,
        messages: wrappedChatRoom.messages.map((msg) => {
          return {
            ...msg,
            author: {
              username: msg.author.username,
              profilePictureURL: msg.author.profilePictureURL,
            },
          }
        }),
      } as IGetChatRoomResponseDTO
    } catch (err) {
      this.logger.error(err)
      throw new BadRequestException(err.message)
    }
  }

  async createChatroom(username: string, data: ICreateChatRoomRequestDTO) {
    data.participants = [username, ...data.participants]
    const { participants, name } = data
    const chatRoom = new ChatRoom()
    chatRoom.name = name

    try {
      const users = await this.userRepo.find({
        $or: participants.map((participant) => ({ username: participant })),
      })

      users.forEach((user) => {
        chatRoom.participants.add(user)
      })

      await this.chatRoomRepo.persistAndFlush(chatRoom)
    } catch (err) {
      this.logger.error(err)
      throw new BadRequestException(err.message)
    }
  }

  async registerObserver(clientId: string, username: string) {
    const redisKey = generateRedisKey(RedisKeyType.CHAT_ROOM, clientId)
    await this.redis.set(redisKey, serializeUserReference({ username }))
  }

  async unregisterObserver(clientId: string) {
    const redisKey = generateRedisKey(RedisKeyType.CHAT_ROOM, clientId)
    await this.redis.del(redisKey)
  }

  async storeMessage(
    author: User,
    roomId: string,
    data: { message?: string; imageUrl?: string },
  ): Promise<IMessageDTO> {
    try {
      const chatRoom = await this.chatRoomRepo.findOne({ id: roomId }, ['messages'])
      const message = new Message(author, data)

      chatRoom.messages.add(message)

      await this.chatRoomRepo.persistAndFlush(chatRoom)

      return {
        id: message.id,
        timestamp: message.timestamp,
        author: {
          username: message.author.username,
          profilePictureURL: message.author.profilePictureURL,
        },
        message: message.message,
        imageUrl: message.imageUrl,
      }
    } catch (err) {
      this.logger.error(err)
      throw new BadRequestException(err.message)
    }
  }

  async uploadImage() {
    // TODO
  }

  async deleteImage() {
    // TODO
  }
}
