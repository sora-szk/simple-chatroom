import { UserProfileHandler } from '../../../../../../app/adapters/handlers/v1/app/userProfileHandler'
import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { userProfileHandlerFactory } from '../../../../../factories/handlers/v1/app/userProfileHandlerFactory'
import { userProfilePresenterFactory } from '../../../../../factories/presenters/userProfilePresenterFactory'
import {
    userProfileConverterFactory,
    userProfileDatastoreFactory,
    userProfileRepositoryFactory,
} from '../../../../../factories/repositories/userProfileRepositoryFactory'
import { userProfileUsecaseFactory } from '../../../../../factories/usecases/userProfileUsecaseFactory'

export const createUserProfileHandler = (): UserProfileHandler => {
    const store = firestoreFactory()

    const userProfileConverter = userProfileConverterFactory()
    const userProfileDatastore = userProfileDatastoreFactory(store, userProfileConverter)
    const userProfileRepository = userProfileRepositoryFactory(userProfileDatastore)

    const userProfileUsecase = userProfileUsecaseFactory(userProfileRepository)
    const userProfilePresenter = userProfilePresenterFactory()

    return userProfileHandlerFactory(userProfileUsecase, userProfilePresenter)
}
