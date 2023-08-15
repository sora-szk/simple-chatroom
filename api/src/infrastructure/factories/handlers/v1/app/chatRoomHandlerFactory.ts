import { ChatRoomHandler } from '../../../../../app/adapters/handlers/v1/app/chatRoomHandler'
import { ChatRoomPresenter } from '../../../../../app/adapters/response/presenters/chatRoomPresenter'
import { ChatRoomUsecase } from '../../../../../app/domain/interfaces/usecases/chatRoomUsecase'
import { ChatRoomHandlerImpl } from '../../../../api/handlers/v1/app/chatRoomHandlerImpl'

export const chatRoomHandlerFactory = (
    chatRoomUsecase: ChatRoomUsecase,
    chatRoomPresenter: ChatRoomPresenter
): ChatRoomHandler => new ChatRoomHandlerImpl(chatRoomUsecase, chatRoomPresenter)
