import { NotificationUsecase } from '../../../../../app/domain/interfaces/usecases/notificationUsecase'
import { AdminNotificationHandler } from '../../../../../app/adapters/handlers/v1/admin/adminNotificationHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { NotificationRequestSchema } from '../../../../../app/adapters/request/schemas/notificationRequestSchema'

export class AdminNotificationHandlerImpl implements AdminNotificationHandler {
    constructor(private notificationUsecase: NotificationUsecase) {}

    async pushHandler(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = NotificationRequestSchema.push.validate(body)
        validationErrorHandler(error)

        const mappedData = {
            receiver: body.receive_user_id,
            title: body.title,
            message: body.message,
        }
        await this.notificationUsecase.push(mappedData)
        ctx.status = 204
    }
}
