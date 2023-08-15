import { RoomMessageUsecase } from '../../../../../app/domain/interfaces/usecases/roomMessageUsecase'
import { RoomMessageHandler } from '../../../../../app/adapters/handlers/v1/app/roomMessageHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { RoomMessageRequestSchema } from '../../../../../app/adapters/request/schemas/roomMessageRequestSchema'
import { RoomMessagePresenter } from '../../../../../app/adapters/response/presenters/roomMessagePresenter'

export class RoomMessageHandlerImpl implements RoomMessageHandler {
    constructor(
        private roomMessageUsecase: RoomMessageUsecase,
        private roomMessagePresenter: RoomMessagePresenter
    ) {}

    async send(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = RoomMessageRequestSchema.send.validate(body)
        validationErrorHandler(error)

        const mappedData = {
            roomID: body.room_id,
            sender: ctx.state.uid,
            text: body.text,
            image: body.image,
        }
        await this.roomMessageUsecase.send(mappedData)
        ctx.body = ''
        ctx.status = 201
    }

    async getList(ctx: AppContext): Promise<void> {
        const { room_id } = ctx.params
        const { error } = RoomMessageRequestSchema.getList.validate({ room_id })
        validationErrorHandler(error)

        const messages = await this.roomMessageUsecase.getList(room_id, {
            readerID: ctx.state.uid,
        })
        ctx.body = {
            room_messages: this.roomMessagePresenter.listDetails(messages),
        }
        ctx.status = 200
    }

    async getDetail(ctx: AppContext): Promise<void> {
        const { room_message_id } = ctx.params
        const { error } = RoomMessageRequestSchema.getDetail.validate({
            room_message_id,
        })
        validationErrorHandler(error)

        const message = await this.roomMessageUsecase.get(room_message_id, {
            readerID: ctx.state.uid,
        })
        ctx.body = {
            room_message: this.roomMessagePresenter.detail(message),
        }
        ctx.status = 200
    }
}
