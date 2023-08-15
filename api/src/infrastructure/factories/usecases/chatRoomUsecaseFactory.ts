import { ChatRoomRepository } from '../../../app/domain/interfaces/repository/chatRoomRepository'
import { ChatRoomUsecase } from '../../../app/domain/interfaces/usecases/chatRoomUsecase'
import { ChatRoomInteractor } from '../../../app/interactors/chatRoomInteractor'

export const chatRoomUsecaseFactory = (chatRoomRepository: ChatRoomRepository): ChatRoomUsecase =>
    new ChatRoomInteractor(chatRoomRepository)
