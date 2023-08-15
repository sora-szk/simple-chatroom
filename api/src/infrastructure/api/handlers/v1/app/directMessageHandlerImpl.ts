import { DirectMessageUsecase } from '../../../../../app/domain/interfaces/usecases/directMessageUsecase'
import { DirectMessageHandler } from '../../../../../app/adapters/handlers/v1/app/directMessageHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { DirectMessageRequestSchema } from '../../../../../app/adapters/request/schemas/directMessageRequestSchema'
import { DirectMessagePresenter } from '../../../../../app/adapters/response/presenters/directMessagePresenter'

export class DirectMessageHandlerImpl implements DirectMessageHandler {
    constructor(
        private directMessageUsecase: DirectMessageUsecase,
        private directMessagePresenter: DirectMessagePresenter
    ) {}

    async send(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = DirectMessageRequestSchema.send.validate(body)
        validationErrorHandler(error)

        const mappedData = {
            sender: ctx.state.uid,
            receiver: body.receiver,
            text: body.text,
            image: body.image,
        }
        await this.directMessageUsecase.send(mappedData)
        ctx.body = ''
        ctx.status = 201
    }

    async getList(ctx: AppContext): Promise<void> {
        const { query, state } = ctx
        const { error } = DirectMessageRequestSchema.getList.validate(query)
        validationErrorHandler(error)

        const mappedData = {
            uid1: state.uid,
            uid2: query.partner_uid,
            fromMessageID: query.from_message_id,
            toMessageID: query.to_message_id,
        } as any
        const messages = await this.directMessageUsecase.getList(mappedData)
        ctx.body = {
            direct_messages: this.directMessagePresenter.listDetails(messages),
        }
        ctx.status = 200
    }

    async getDetail(ctx: AppContext): Promise<void> {
        const { direct_message_id } = ctx.params
        const { error } = DirectMessageRequestSchema.getDetail.validate(ctx.params)
        validationErrorHandler(error)

        const message = await this.directMessageUsecase.get(direct_message_id)
        ctx.body = {
            direct_message: this.directMessagePresenter.detail(message),
        }
        ctx.status = 200
    }
}
