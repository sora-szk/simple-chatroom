import { NotificationUsecase } from '../../../../../app/domain/interfaces/usecases/notificationUsecase'
import { NotificationHandler } from '../../../../../app/adapters/handlers/v1/app/notificationHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { NotificationRequestSchema } from '../../../../../app/adapters/request/schemas/notificationRequestSchema'
import { NotificationPresenter } from '../../../../../app/adapters/response/presenters/notificationPresenter'

export class NotificationHandlerImpl implements NotificationHandler {
    constructor(
        private notificationUsecase: NotificationUsecase,
        private notificationPresenter: NotificationPresenter
    ) {}

    async getList(ctx: AppContext): Promise<void> {
        const receiverID = ctx.state.uid
        const notifications = await this.notificationUsecase.getList(receiverID)
        ctx.body = {
            notifications: this.notificationPresenter.listDetails(notifications),
        }
        ctx.status = 200
    }

    async getDetail(ctx: AppContext): Promise<void> {
        const receiverID = ctx.state.uid
        const { notification_id } = ctx.params
        const { error } = NotificationRequestSchema.getDetail.validate({ notification_id })
        validationErrorHandler(error)

        const notificationDetail = await this.notificationUsecase.getDetail(notification_id)
        // リクエストユーザがメッセージ宛先ユーザであるか
        // FIXME: usecaseに移行すべき処理
        const forRequestUserNotification = receiverID === notificationDetail?.receiver

        ctx.body = {
            notification: forRequestUserNotification
                ? this.notificationPresenter.detail(notificationDetail)
                : null,
        }
        ctx.status = 200
    }
}
