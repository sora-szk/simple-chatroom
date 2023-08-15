import { NotificationPresenter } from '../../../app/adapters/response/presenters/notificationPresenter'
import { NotificationPresenterImpl } from '../../api/presenters/notificationPresenterImpl'

export const notificationPresenterFactory = (): NotificationPresenter =>
    new NotificationPresenterImpl()
