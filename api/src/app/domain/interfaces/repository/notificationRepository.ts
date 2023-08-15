import { NotificationModel } from '../../entities/models/notificationModel'

export interface NotificationRepository {
    create(
        data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>
    ): Promise<void>
    get(notificationID: string): Promise<NotificationModel | null>
    getAll(receiver: string): Promise<NotificationModel[]>
}
