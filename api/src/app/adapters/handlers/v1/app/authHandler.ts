import { AppContext } from '../../../../../infrastructure/api/types/appContext'

export interface AuthHandler {
    signup(ctx: AppContext): Promise<void>
}
