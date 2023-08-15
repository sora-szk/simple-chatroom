import { NotificationModel } from '../domain/entities/models/notificationModel'
import { NotificationRepository } from '../domain/interfaces/repository/notificationRepository'
import { NotificationUsecase } from '../domain/interfaces/usecases/notificationUsecase'

export class NotificationInteractor implements NotificationUsecase {
    constructor(private notificationRepository: NotificationRepository) {}

    async push(
        data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.notificationRepository.create(data)
    }

    async getDetail(notificationID: string): Promise<NotificationModel | null> {
        return this.notificationRepository.get(notificationID)
    }

    async getList(receiverID: string): Promise<NotificationModel[]> {
        return this.notificationRepository.getAll(receiverID)
    }
}
