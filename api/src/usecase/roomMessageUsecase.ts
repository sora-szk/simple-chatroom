import { createAppError } from '../domain/appError'
import { RoomMessageModel } from '../domain/model/roomMessageModel'
import { ChatRoomRepository } from '../domain/repository/chatRoomRepository'
import { RoomMessageRepository } from '../domain/repository/roomMessageRepository'
import { createChatRoomDatastore } from '../infrastructure/datastore/chatRoomDatastore'
import { createRoomMessageDatastore } from '../infrastructure/datastore/roomMessageDatastore'

export interface RoomMessageUsecase {
    send(data: Omit<RoomMessageModel, 'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void>
    get(readerID: string, roomMessageID: string): Promise<RoomMessageModel | null>
    getList(roomID: string, readerID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]>
}

export const createRoomMessageUsecase = (
    roomMessageRepository?: RoomMessageRepository,
    chatRoomRepository?: ChatRoomRepository
): RoomMessageUsecase => {
    const _roomMessageRepository = roomMessageRepository ?? createRoomMessageDatastore()
    const _chatRoomRepository = chatRoomRepository ?? createChatRoomDatastore()

    return new RoomMessageUsecaseImpl(_roomMessageRepository, _chatRoomRepository)
}

export class RoomMessageUsecaseImpl implements RoomMessageUsecase {
    private roomMessageRepository: RoomMessageRepository
    private chatRoomRepository: ChatRoomRepository

    constructor(roomMessageRepository: RoomMessageRepository, chatRoomRepository: ChatRoomRepository) {
        this.roomMessageRepository = roomMessageRepository
        this.chatRoomRepository = chatRoomRepository
    }

    async send(data: Omit<RoomMessageModel, 'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const chatRoomInfo = await this.chatRoomRepository.getDetail(data.roomID)
        if (chatRoomInfo === null) throw createAppError(404101)
        if (chatRoomInfo.whiteList !== null && !chatRoomInfo.whiteList.includes(data.sender)) {
            throw createAppError(403201)
        }
        if (chatRoomInfo.blackList.includes(data.sender)) throw createAppError(403201)
        await this.roomMessageRepository.create(data)
    }

    async get(readerID: string, roomMessageID: string): Promise<RoomMessageModel | null> {
        const message = await this.roomMessageRepository.get(roomMessageID)
        if (message === null) return null

        const chatRoomInfo = await this.chatRoomRepository.getDetail(message.roomID)
        if (chatRoomInfo === null) return null
        if (chatRoomInfo.whiteList !== null && !chatRoomInfo.whiteList.includes(readerID)) {
            throw createAppError(403201)
        }
        if (chatRoomInfo.blackList.includes(readerID)) throw createAppError(403201)
        return message
    }

    async getList(roomID: string, readerID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]> {
        const chatRoomInfo = await this.chatRoomRepository.getDetail(roomID)
        if (chatRoomInfo === null) return []
        if (chatRoomInfo.whiteList !== null && !chatRoomInfo.whiteList.includes(readerID)) {
            throw createAppError(403201)
        }
        return this.roomMessageRepository.getList(roomID, fromMessageID, toMessageID)
    }
}
