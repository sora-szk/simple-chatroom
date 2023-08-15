import { AuthUsecase } from '../../../../../app/domain/interfaces/usecases/authUsecase'
import { AuthHandler } from '../../../../../app/adapters/handlers/v1/app/authHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { AuthRequestSchema } from '../../../../../app/adapters/request/schemas/authRequestSchema'

export class AuthHandlerImpl implements AuthHandler {
    constructor(private authUsecase: AuthUsecase) {}

    async signup(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = AuthRequestSchema.signupAuthRequest.validate(body)
        validationErrorHandler(error)

        await this.authUsecase.signup(body)
        ctx.body = ''
        ctx.status = 201
    }
}
