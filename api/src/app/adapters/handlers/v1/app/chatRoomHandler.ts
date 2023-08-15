import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface ChatRoomHandler {
    create(ctx: AppContext): Promise<void>
    invite(ctx: AppContext): Promise<void>
    inviteEditor(ctx: AppContext): Promise<void>
    expel(ctx: AppContext): Promise<void>
    getList(ctx: AppContext): Promise<void>
    getDetail(ctx: AppContext): Promise<void>
}
