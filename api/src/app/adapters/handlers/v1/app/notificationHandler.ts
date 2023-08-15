import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface NotificationHandler {
    getList(ctx: AppContext): Promise<void>
    getDetail(ctx: AppContext): Promise<void>
}
