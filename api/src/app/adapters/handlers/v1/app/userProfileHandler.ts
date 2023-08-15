import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface UserProfileHandler {
    update(ctx: AppContext): Promise<void>
    getDetail(ctx: AppContext): Promise<void>
}
