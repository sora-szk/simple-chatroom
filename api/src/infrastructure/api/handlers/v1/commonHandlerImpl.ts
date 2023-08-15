import { AppContext } from '../../types/appContext'
import { CommonHandler } from '../../../../app/adapters/handlers/commonHandler'

export class CommonHandlerImpl implements CommonHandler {
    ping(ctx: AppContext): void {
        ctx.body = 'pong'
        ctx.status = 200
    }
}
