import { ChatRoomRepository } from '../../../app/domain/interfaces/repository/chatRoomRepository'
import { RoomMessageRepository } from '../../../app/domain/interfaces/repository/roomMessageRepository'
import { RoomMessageUsecase } from '../../../app/domain/interfaces/usecases/roomMessageUsecase'
import { RoomMessageInteractor } from '../../../app/interactors/roomMessageInteractor'

export const roomMessageUsecaseFactory = (
    chatRoomRepository: ChatRoomRepository,
    roomMessageRepository: RoomMessageRepository
): RoomMessageUsecase => new RoomMessageInteractor(chatRoomRepository, roomMessageRepository)
