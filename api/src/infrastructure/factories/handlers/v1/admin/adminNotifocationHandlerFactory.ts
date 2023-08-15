import { AdminNotificationHandler } from '../../../../../app/adapters/handlers/v1/admin/adminNotificationHandler'
import { NotificationUsecase } from '../../../../../app/domain/interfaces/usecases/notificationUsecase'
import { AdminNotificationHandlerImpl } from '../../../../api/handlers/v1/admin/adminNotificationHandlerImpl'

export const adminNotificationHandlerFactory = (
    notificationUsecase: NotificationUsecase
): AdminNotificationHandler => new AdminNotificationHandlerImpl(notificationUsecase)
