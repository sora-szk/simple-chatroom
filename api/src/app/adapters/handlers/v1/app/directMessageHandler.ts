import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface DirectMessageHandler {
    send(ctx: AppContext): Promise<void>
    getList(ctx: AppContext): Promise<void>
    getDetail(ctx: AppContext): Promise<void>
}
