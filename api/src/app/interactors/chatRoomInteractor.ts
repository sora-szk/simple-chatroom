import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'
import { ChatRoomModel } from '../domain/entities/models/chatRoomModel'
import { ChatRoomRepository } from '../domain/interfaces/repository/chatRoomRepository'
import { ChatRoomUsecase } from '../domain/interfaces/usecases/chatRoomUsecase'
import { hasRoomAccess } from './helper/hasRoomAccessHelper'

export class ChatRoomInteractor implements ChatRoomUsecase {
    constructor(private chatRoomRepository: ChatRoomRepository) {}

    async create(
        data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>
    ): Promise<{ roomID: string }> {
        return this.chatRoomRepository.create(data)
    }

    async inviteEditor(roomID: string, data: { senderUID: string; uid: string }): Promise<void> {
        const room = await this.getChatRoomOrThrow(roomID)
        if (room.organizer !== data.senderUID) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION)
        }
        await this.chatRoomRepository.inviteEditor(roomID, data)
    }

    async invite(roomID: string, data: { senderUID: string; uid: string }): Promise<void> {
        const room = await this.getChatRoomOrThrow(roomID)
        if (!room.editorList.includes(data.senderUID)) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION)
        }
        await this.chatRoomRepository.invite(roomID, data)
    }

    async expel(roomID: string, data: { senderUID: string; uid: string }): Promise<void> {
        const room = await this.getChatRoomOrThrow(roomID)
        if (!room.editorList.includes(data.senderUID)) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION)
        }
        await this.chatRoomRepository.expel(roomID, data)
    }

    async getDetail(roomID: string, data: { uid: string }): Promise<ChatRoomModel | null> {
        const { uid } = data
        const room = await this.getChatRoomOrThrow(roomID)
        const canAccessRoom = hasRoomAccess(room, uid)
        return canAccessRoom ? room : null
    }

    async getList(uid: string): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]> {
        const rawList = await this.chatRoomRepository.getList()
        const respList = rawList.filter((room) => hasRoomAccess(room, uid))
        return respList
    }

    private async getChatRoomOrThrow(roomID: string): Promise<ChatRoomModel> {
        const room = await this.chatRoomRepository.getDetail(roomID)
        if (room === null) throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_NOT_FOUND)
        return room
    }
}
