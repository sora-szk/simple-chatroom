import { RoomMessageHandler } from '../../../../../app/adapters/handlers/v1/app/roomMessageHandler'
import { RoomMessagePresenter } from '../../../../../app/adapters/response/presenters/roomMessagePresenter'
import { RoomMessageUsecase } from '../../../../../app/domain/interfaces/usecases/roomMessageUsecase'
import { RoomMessageHandlerImpl } from '../../../../api/handlers/v1/app/roomMessageHandlerImpl'

export const roomMessageHandlerFactory = (
    roomMessageUsecase: RoomMessageUsecase,
    roomMessagePresenter: RoomMessagePresenter
): RoomMessageHandler => new RoomMessageHandlerImpl(roomMessageUsecase, roomMessagePresenter)
