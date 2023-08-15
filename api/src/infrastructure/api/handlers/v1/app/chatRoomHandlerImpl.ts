import { ChatRoomUsecase } from '../../../../../app/domain/interfaces/usecases/chatRoomUsecase'
import { ChatRoomHandler } from '../../../../../app/adapters/handlers/v1/app/chatRoomHandler'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { ChatRoomRequestSchema } from '../../../../../app/adapters/request/schemas/chatRoomRequestSchema'
import { ChatRoomPresenter } from '../../../../../app/adapters/response/presenters/chatRoomPresenter'
import { AppContext } from '../../../types/appContext'

export class ChatRoomHandlerImpl implements ChatRoomHandler {
    constructor(
        private chatRoomUsecase: ChatRoomUsecase,
        private chatRoomPresenter: ChatRoomPresenter
    ) {}

    async create(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = ChatRoomRequestSchema.create.validate(body)
        validationErrorHandler(error)

        const mappedData = {
            name: body.name,
            organizer: ctx.state.uid,
            editorList: body.editor_list,
            whiteList: body.white_list ?? null,
            blackList: body.black_list,
        }
        const result = await this.chatRoomUsecase.create(mappedData)
        ctx.body = this.chatRoomPresenter.createResult(result)
        ctx.status = 201
    }

    async invite(ctx: AppContext): Promise<void> {
        const room_id = ctx.params.room_id
        const body = ctx.request.body as any
        const { error } = ChatRoomRequestSchema.invite.validate({
            room_id,
            ...body,
        })
        validationErrorHandler(error)

        const mappedData = {
            senderUID: ctx.state.uid,
            uid: body.invite_user_id,
        }
        await this.chatRoomUsecase.invite(ctx.params.room_id, mappedData)
        ctx.status = 204
    }

    async inviteEditor(ctx: AppContext): Promise<void> {
        const room_id = ctx.params.room_id
        const body = ctx.request.body as any
        const { error } = ChatRoomRequestSchema.invite.validate({
            room_id,
            ...body,
        })
        validationErrorHandler(error)

        const mappedData = {
            senderUID: ctx.state.uid,
            uid: body.invite_user_id,
        }
        await this.chatRoomUsecase.inviteEditor(room_id, mappedData)
        ctx.status = 204
    }

    async expel(ctx: AppContext): Promise<void> {
        const room_id = ctx.params.room_id
        const body = ctx.request.body as any
        const { error } = ChatRoomRequestSchema.expel.validate({
            room_id,
            ...body,
        })
        validationErrorHandler(error)

        const mappedData = {
            senderUID: ctx.state.uid,
            uid: body.invite_user_id,
        }
        await this.chatRoomUsecase.expel(ctx.params.room_id, mappedData)
        ctx.status = 204
    }

    async getList(ctx: AppContext): Promise<void> {
        const room_id = ctx.params.room_id
        const { error } = ChatRoomRequestSchema.getList.validate({
            room_id,
        })
        validationErrorHandler(error)

        const chatRooms = await this.chatRoomUsecase.getList(room_id)
        ctx.body = {
            chat_rooms: this.chatRoomPresenter.summaryList(chatRooms),
        }
        ctx.status = 200
    }

    async getDetail(ctx: AppContext): Promise<void> {
        const room_id = ctx.params.room_id
        const { error } = ChatRoomRequestSchema.getDetail.validate({
            room_id,
        })
        validationErrorHandler(error)

        const chatRoom = await this.chatRoomUsecase.getDetail(room_id, { uid: ctx.state.uid })
        ctx.body = {
            chat_room: this.chatRoomPresenter.detail(chatRoom),
        }
        ctx.status = 200
    }
}
