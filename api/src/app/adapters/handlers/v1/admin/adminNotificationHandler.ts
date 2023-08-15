import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface AdminNotificationHandler {
    pushHandler(ctx: AppContext): Promise<void>
}
