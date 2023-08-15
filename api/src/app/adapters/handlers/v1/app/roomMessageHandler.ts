import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface RoomMessageHandler {
    send(ctx: AppContext): Promise<void>
    getList(ctx: AppContext): Promise<void>
    getDetail(ctx: AppContext): Promise<void>
}
