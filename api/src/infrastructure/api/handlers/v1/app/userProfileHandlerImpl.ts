import { UserProfileUsecase } from '../../../../../app/domain/interfaces/usecases/userProfileUsecase'
import { UserProfileHandler } from '../../../../../app/adapters/handlers/v1/app/userProfileHandler'
import { AppContext } from '../../../types/appContext'
import { validationErrorHandler } from '../../helper/validationErrorHelper'
import { UserProfileRequestSchema } from '../../../../../app/adapters/request/schemas/userProfileRequestSchema'
import { UserProfilePresenter } from '../../../../../app/adapters/response/presenters/userProfilePresenter'

export class UserProfileHandlerImpl implements UserProfileHandler {
    constructor(
        private userProfileUsecase: UserProfileUsecase,
        private userProfilePresenter: UserProfilePresenter
    ) {}

    async update(ctx: AppContext): Promise<void> {
        const body = ctx.request.body as any
        const { error } = UserProfileRequestSchema.update.validate(body)
        validationErrorHandler(error)

        await this.userProfileUsecase.update(ctx.state.uid, body)
        ctx.status = 204
    }

    async getDetail(ctx: AppContext): Promise<void> {
        const uid = ctx.state.uid
        const userProfile = await this.userProfileUsecase.get(uid)
        ctx.body = {
            user_profile: this.userProfilePresenter.detail(userProfile),
        }
        ctx.status = 200
    }
}
