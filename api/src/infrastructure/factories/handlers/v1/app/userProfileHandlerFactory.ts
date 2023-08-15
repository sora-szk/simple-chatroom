import { UserProfileHandler } from '../../../../../app/adapters/handlers/v1/app/userProfileHandler'
import { UserProfilePresenter } from '../../../../../app/adapters/response/presenters/userProfilePresenter'
import { UserProfileUsecase } from '../../../../../app/domain/interfaces/usecases/userProfileUsecase'
import { UserProfileHandlerImpl } from '../../../../api/handlers/v1/app/userProfileHandlerImpl'

export const userProfileHandlerFactory = (
    userProfileUsecase: UserProfileUsecase,
    userProfilePresenter: UserProfilePresenter
): UserProfileHandler => new UserProfileHandlerImpl(userProfileUsecase, userProfilePresenter)
