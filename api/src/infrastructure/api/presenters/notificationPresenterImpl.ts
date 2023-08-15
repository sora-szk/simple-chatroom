import { NotificationPresentModel } from '../../../app/adapters/response/models/notificationPresentModel'
import { NotificationPresenter } from '../../../app/adapters/response/presenters/notificationPresenter'
import { NotificationModel } from '../../../app/domain/entities/models/notificationModel'

export class NotificationPresenterImpl implements NotificationPresenter {
    detail(source: NotificationModel | null): NotificationPresentModel | null {
        return source
            ? {
                  notification_id: source.notificationID,
                  receiver: source.receiver,
                  title: source.title,
                  message: source.message,
                  created_at: source.createdAt.toISOString(),
                  updated_at: source.updatedAt.toISOString(),
              }
            : null
    }

    listDetails(source: (NotificationModel | null)[]): NotificationPresentModel[] {
        return source
            .filter((v) => v !== null)
            .map((v) => this.detail(v)) as NotificationPresentModel[]
    }
}
