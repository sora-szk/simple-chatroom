import { NotificationRepository } from '../../../app/domain/interfaces/repository/notificationRepository'
import { NotificationUsecase } from '../../../app/domain/interfaces/usecases/notificationUsecase'
import { NotificationInteractor } from '../../../app/interactors/notificationInteractor'

export const notificationUsecaseFactory = (
    notificationRepository: NotificationRepository
): NotificationUsecase => new NotificationInteractor(notificationRepository)
