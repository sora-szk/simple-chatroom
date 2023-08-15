import { NotificationModel } from '../../entities/models/notificationModel'

export interface NotificationUsecase {
    push(data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>): Promise<void>
    getDetail(notificationID: string): Promise<NotificationModel | null>
    getList(receiverID: string): Promise<NotificationModel[]>
}
