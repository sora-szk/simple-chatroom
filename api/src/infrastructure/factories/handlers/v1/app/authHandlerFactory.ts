import { AuthHandler } from '../../../../../app/adapters/handlers/v1/app/authHandler'
import { AuthUsecase } from '../../../../../app/domain/interfaces/usecases/authUsecase'
import { AuthHandlerImpl } from '../../../../api/handlers/v1/app/authHandlerImpl'

export const authHandlerFactory = (authUsecase: AuthUsecase): AuthHandler =>
    new AuthHandlerImpl(authUsecase)
