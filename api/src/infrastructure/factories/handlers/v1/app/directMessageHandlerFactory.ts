import { DirectMessageHandler } from '../../../../../app/adapters/handlers/v1/app/directMessageHandler'
import { DirectMessagePresenter } from '../../../../../app/adapters/response/presenters/directMessagePresenter'
import { DirectMessageUsecase } from '../../../../../app/domain/interfaces/usecases/directMessageUsecase'
import { DirectMessageHandlerImpl } from '../../../../api/handlers/v1/app/directMessageHandlerImpl'

export const directMessageHandlerFactory = (
    directMessageUsecase: DirectMessageUsecase,
    directMessagePresenter: DirectMessagePresenter
): DirectMessageHandler =>
    new DirectMessageHandlerImpl(directMessageUsecase, directMessagePresenter)
