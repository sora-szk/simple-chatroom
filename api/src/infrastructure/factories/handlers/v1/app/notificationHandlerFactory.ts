import { NotificationHandler } from '../../../../../app/adapters/handlers/v1/app/notificationHandler'
import { NotificationPresenter } from '../../../../../app/adapters/response/presenters/notificationPresenter'
import { NotificationUsecase } from '../../../../../app/domain/interfaces/usecases/notificationUsecase'
import { NotificationHandlerImpl } from '../../../../api/handlers/v1/app/notificationHandlerImpl'

export const notificationHandlerFactory = (
    notificationUsecase: NotificationUsecase,
    notificationPresenter: NotificationPresenter
): NotificationHandler => new NotificationHandlerImpl(notificationUsecase, notificationPresenter)
