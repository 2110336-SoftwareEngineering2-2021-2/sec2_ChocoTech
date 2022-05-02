import { Collection, NotFoundError } from '@mikro-orm/core'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { when } from 'jest-when'

import { Review } from '@backend/entities/Review'
import { Schedule } from '@backend/entities/Schedule'
import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'

import { UserRole } from '@libs/api'

import { WorkHistoryService } from './work-history.service'

const mockTopic1 = 'topic1'
const mockDescription1 = 'topic1-desc'
const mockTopic2 = 'topic2'
const mockDescription2 = 'topic2-desc'
const mockTopic3 = 'topic3'
const mockDescription3 = 'topic3-desc'
const mockExpert1: User = {
  username: 'test',
  email: 'test@gmail.com',
  passwordHash: '',
  displayName: 'mr.test',
  coinBalance: 0,
  onlineStatus: true,
  registerationDate: new Date(),
  role: UserRole.EXPERT,
  schedules: new Collection<Schedule>(this),
  reviews: new Collection<Review>(this),
}
const mockExpert2: User = {
  username: 'test',
  email: 'test@gmail.com',
  passwordHash: '',
  displayName: 'mr.test',
  coinBalance: 0,
  onlineStatus: true,
  registerationDate: new Date(),
  role: UserRole.EXPERT,
  schedules: new Collection<Schedule>(this),
  reviews: new Collection<Review>(this),
}
const mockWorkHistory1 = new WorkHistory(mockExpert1, mockTopic1, mockDescription1)
const mockWorkHistory2 = new WorkHistory(mockExpert1, mockTopic2, mockDescription2)
const mockWorkHistory3 = new WorkHistory(mockExpert2, mockTopic3, mockDescription3)
describe('WorkHistoryService', () => {
  let service: WorkHistoryService
  const findSpy = jest.fn()
  const findOneOrFailSpy = jest.fn()
  const removeAndFlushSpy = jest.fn()
  when(findSpy)
    .calledWith(mockExpert1)
    .mockReturnValue([mockWorkHistory1, mockWorkHistory2])
    .calledWith(mockExpert2)
    .mockReturnValue([mockWorkHistory3])
  when(findOneOrFailSpy)
    .calledWith({ id: mockWorkHistory1.id })
    .mockReturnValue(mockWorkHistory1)
    .calledWith({ id: mockWorkHistory2.id })
    .mockReturnValue(mockWorkHistory2)
    .calledWith({ id: mockWorkHistory3.id })
    .mockReturnValue(mockWorkHistory3)
  when(removeAndFlushSpy).calledWith(mockWorkHistory1).mockReturnValue([])
  const mockWorkHistoryRepository = {
    persistAndFlush: jest.fn(),
    removeAndFlush: removeAndFlushSpy,
    find: findSpy,
    findOneOrFail: findOneOrFailSpy,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkHistoryService,
        {
          provide: getRepositoryToken(WorkHistory),
          useValue: mockWorkHistoryRepository,
        },
      ],
    }).compile()

    service = module.get<WorkHistoryService>(WorkHistoryService)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should add new workHistory', async () => {
    const expectedExpert = mockExpert1
    const expectedTopic = mockTopic1
    const expectedDesc = mockDescription1
    await service.addWorkHistory(mockExpert1, mockTopic1, mockDescription1)
    expect(mockWorkHistoryRepository.persistAndFlush).toBeCalledTimes(1)
    const len = mockWorkHistoryRepository.persistAndFlush.mock.calls.length
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[len - 1][0].expert).toEqual(
      expectedExpert,
    )
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[len - 1][0].topic).toMatch(
      expectedTopic,
    )
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[len - 1][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should get all workHistory', async () => {
    await service.getAllWorkHistory(mockExpert1)
    expect(mockWorkHistoryRepository.find).toBeCalledTimes(1)
    const len = mockWorkHistoryRepository.find.mock.calls.length
    expect(mockWorkHistoryRepository.find.mock.calls[len - 1][0]).toEqual({ expert: mockExpert1 })
  })
  it('should edit workHistory', async () => {
    //edit my workhistory
    const expectedTopic = 'new topic'
    const expectedDesc = 'new desc'
    await service.editWorkHistory(mockExpert2, 'new topic', 'new desc', mockWorkHistory3.id)
    const len = mockWorkHistoryRepository.persistAndFlush.mock.calls.length
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[len - 1][0].topic).toMatch(
      expectedTopic,
    )
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[len - 1][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should not edit workHistory (edit other workhistory)', async () => {
    //prevent edit other workhistory
    try {
      await service.editWorkHistory(mockExpert1, 'new topic-1', 'new desc-1', mockWorkHistory3.id)
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException)
      expect(e.message).toBe('This is not your work history')
    }
  })

  it('should not edit workHistory (edit not found workhistory -> other error)', async () => {
    //prevent edit not found workhistory
    try {
      await service.editWorkHistory(mockExpert1, 'new topic-1', 'new desc-1', '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
  it('should not edit workHistory (edit not found workhistory -> not found error)', async () => {
    //prevent edit not found workhistory
    try {
      findOneOrFailSpy.mockImplementationOnce(() => {
        throw new NotFoundError('not found!')
      })
      await service.editWorkHistory(mockExpert1, 'new topic-1', 'new desc-1', '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException)
      expect(e.message).toBe('Work history ID is not founded')
    }
  })
  it('should delete workHistory', async () => {
    //delete my workhistory
    const expectedTopic = 'topic1'
    const expectedDesc = 'topic1-desc'
    await service.deleteWorkHistory(mockExpert1, mockWorkHistory1.id)
    const len = mockWorkHistoryRepository.removeAndFlush.mock.calls.length
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[len - 1][0].topic).toMatch(
      expectedTopic,
    )
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[len - 1][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should not delete workHistory', async () => {
    //prevent delete other workhistory
    try {
      await service.deleteWorkHistory(mockExpert1, mockWorkHistory3.id)
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException)
      expect(e.message).toBe('This is not your work history')
    }
  })
  it('should not delete workHistory (edit not found workhistory -> other error)', async () => {
    //prevent delete not found workhistory
    try {
      await service.deleteWorkHistory(mockExpert1, '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
  it('should not delete workHistory (edit not found workhistory -> not found error)', async () => {
    //prevent delete not found workhistory
    try {
      findOneOrFailSpy.mockImplementationOnce(() => {
        throw new NotFoundError('not found!')
      })
      await service.deleteWorkHistory(mockExpert1, '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException)
      expect(e.message).toBe('Work history ID is not founded')
    }
  })
})
/*
yarn jest --coverage --config=./jest.config.js
*/
