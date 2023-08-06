import { NotificationModel } from '../../domain/model/notificationModel'

export const detail = (source: NotificationModel) => ({
    notification_id: source.notificationID,
    receiver: source.receiver,
    title: source.title,
    message: source.message,
    created_at: source.createdAt.toISOString(),
    updated_at: source.updatedAt.toISOString(),
})

export const detailList = (source: NotificationModel[]) => source.map(detail)
