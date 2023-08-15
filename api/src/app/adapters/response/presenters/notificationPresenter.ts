import { NotificationModel } from '../../../domain/entities/models/notificationModel'
import { NotificationPresentModel } from '../models/notificationPresentModel'

export interface NotificationPresenter {
    detail(source: NotificationModel | null): NotificationPresentModel | null
    listDetails(source: (NotificationModel | null)[]): NotificationPresentModel[]
}
