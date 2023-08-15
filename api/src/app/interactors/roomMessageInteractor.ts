import { RoomMessageModel } from '../domain/entities/models/roomMessageModel'
import { RoomMessageRepository } from '../domain/interfaces/repository/roomMessageRepository'
import { RoomMessageUsecase } from '../domain/interfaces/usecases/roomMessageUsecase'
import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'
import { ChatRoomRepository } from '../domain/interfaces/repository/chatRoomRepository'
import { hasRoomAccess } from './helper/hasRoomAccessHelper'

export class RoomMessageInteractor implements RoomMessageUsecase {
    constructor(
        private chatRoomRepository: ChatRoomRepository,
        private roomMessageRepository: RoomMessageRepository
    ) {}

    async send(
        data: Omit<
            RoomMessageModel,
            'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        const room = await this.chatRoomRepository.getDetail(data.roomID)
        if (room === null) throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_NOT_FOUND)
        if (!hasRoomAccess(room, data.sender)) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION)
        }
        await this.roomMessageRepository.create(data)
    }

    async get(roomMessageID: string, data: { readerID: string }): Promise<RoomMessageModel | null> {
        const { readerID } = data
        const message = await this.roomMessageRepository.get(roomMessageID)
        if (message === null) return null
        const room = await this.chatRoomRepository.getDetail(message.roomID)
        if (room === null) return null
        const canAccessRoom = hasRoomAccess(room, readerID)
        return canAccessRoom ? message : null
    }

    async getList(
        roomID: string,
        data: { readerID: string; fromMessageID?: number; toMessageID?: number }
    ): Promise<RoomMessageModel[]> {
        const room = await this.chatRoomRepository.getDetail(roomID)
        if (room === null) return []
        const canAccessRoom = hasRoomAccess(room, data.readerID)
        return canAccessRoom ? this.roomMessageRepository.getList(roomID, data) : []
    }
}
