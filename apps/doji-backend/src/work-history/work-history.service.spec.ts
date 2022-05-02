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
  messages: undefined,
  chatRooms: undefined,
  requestSent: undefined,
  requestReceived: undefined,
  friendship: undefined,
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
  messages: undefined,
  chatRooms: undefined,
  requestSent: undefined,
  requestReceived: undefined,
  friendship: undefined,
}
const mockWorkHistory1 = new WorkHistory(
  mockExpert1,
  mockTopic1,
  mockDescription1,
  'https://storage.googleapis.com/doji-profile-pic/73cf7e846468e49db838518765aee5d3?fbclid=IwAR2-Q_AcAG95svoIoF3sJCiXsFxDlY5ype1_eLDFgGkAyHD0DNQ2E200-u4',
)
const mockWorkHistory2 = new WorkHistory(
  mockExpert1,
  mockTopic2,
  mockDescription2,
  'https://storage.googleapis.com/doji-profile-pic/73cf7e846468e49db838518765aee5d3?fbclid=IwAR2-Q_AcAG95svoIoF3sJCiXsFxDlY5ype1_eLDFgGkAyHD0DNQ2E200-u4',
)
const mockWorkHistory3 = new WorkHistory(mockExpert2, mockTopic3, mockDescription3, '')
describe('WorkHistoryService', () => {
  let workHistoryService: WorkHistoryService
  const findSpy = jest.fn()
  const findOneOrFailSpy = jest.fn()
  const removeAndFlushSpy = jest.fn()
  when(findSpy)
    .calledWith({ expert: mockExpert1 })
    .mockReturnValue([mockWorkHistory1])
    .calledWith({ expert: mockExpert2 })
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

    workHistoryService = module.get<WorkHistoryService>(WorkHistoryService)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(workHistoryService).toBeDefined()
  })
  it('should add new workHistory', async () => {
    const expectedExpert = mockExpert1
    const expectedTopic = mockTopic1
    const expectedDesc = mockDescription1
    await workHistoryService.addWorkHistory(mockExpert1, mockTopic1, mockDescription1, '')
    expect(mockWorkHistoryRepository.persistAndFlush).toBeCalledTimes(1)
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].expert).toEqual(
      expectedExpert,
    )
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].topic).toMatch(expectedTopic)
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should get all workHistory', async () => {
    await workHistoryService.getAllWorkHistory(mockExpert1)
    expect(mockWorkHistoryRepository.find).toBeCalledTimes(1)
    expect(mockWorkHistoryRepository.find.mock.calls[0][0]).toEqual({ expert: mockExpert1 })
  })
  it('should edit my own workHistory', async () => {
    //edit my workhistory
    const expectedTopic = 'new topic'
    const expectedDesc = 'new desc'
    await workHistoryService.editWorkHistory(
      mockExpert2,
      'new topic',
      'new desc',
      mockWorkHistory3.id,
    )
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].expert).toEqual(mockExpert2)
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].topic).toMatch(expectedTopic)
    expect(mockWorkHistoryRepository.persistAndFlush.mock.calls[0][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should not edit other workHistory', async () => {
    //prevent edit other workhistory
    try {
      await workHistoryService.editWorkHistory(
        mockExpert1,
        'new topic-1',
        'new desc-1',
        mockWorkHistory3.id,
      )
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException)
      expect(e.message).toBe('This is not your work history')
    }
  })

  it('should not edit undiscovered workHistory (other)', async () => {
    //prevent edit not found workhistory
    try {
      await workHistoryService.editWorkHistory(mockExpert1, 'new topic-1', 'new desc-1', '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
  it('should not edit undiscovered workHistory (not found)', async () => {
    //prevent edit not found workhistory
    try {
      findOneOrFailSpy.mockImplementationOnce(() => {
        throw new NotFoundError('not found!')
      })
      await workHistoryService.editWorkHistory(mockExpert1, 'new topic-1', 'new desc-1', '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException)
      expect(e.message).toBe('Work history ID is not founded')
    }
  })
  it('should delete my given workHistory', async () => {
    //delete my workhistory
    const expectedTopic = 'topic1'
    const expectedDesc = 'topic1-desc'
    await workHistoryService.deleteWorkHistory(mockExpert1, mockWorkHistory1.id)
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[0][0].id).toEqual(
      mockWorkHistory1.id,
    )
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[0][0].expert).toEqual(mockExpert1)
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[0][0].topic).toMatch(expectedTopic)
    expect(mockWorkHistoryRepository.removeAndFlush.mock.calls[0][0].description).toMatch(
      expectedDesc,
    )
  })
  it('should not delete other workHistory', async () => {
    //prevent delete other workhistory
    try {
      await workHistoryService.deleteWorkHistory(mockExpert1, mockWorkHistory3.id)
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException)
      expect(e.message).toBe('This is not your work history')
    }
  })
  it('should not delete undiscovered workHistory (other)', async () => {
    //prevent delete not found workhistory
    try {
      await workHistoryService.deleteWorkHistory(mockExpert1, '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
  it('should not delete undiscovered workHistory (not found)', async () => {
    //prevent delete not found workhistory
    try {
      findOneOrFailSpy.mockImplementationOnce(() => {
        throw new NotFoundError('not found!')
      })
      await workHistoryService.deleteWorkHistory(mockExpert1, '-1')
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException)
      expect(e.message).toBe('Work history ID is not founded')
    }
  })
})
/*
yarn test:backend
yarn jest --coverage --config=./jest.config.js
*/
