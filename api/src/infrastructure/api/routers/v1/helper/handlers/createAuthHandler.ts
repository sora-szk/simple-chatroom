import { AuthHandler } from '../../../../../../app/adapters/handlers/v1/app/authHandler'
import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { authHandlerFactory } from '../../../../../factories/handlers/v1/app/authHandlerFactory'
import { authRepositoryFactory } from '../../../../../factories/repositories/authRepositoryFactory'
import {
    privateUserProfileConverterFactory,
    privateUserProfileDatastoreFactory,
    privateUserProfileRepositoryFactory,
} from '../../../../../factories/repositories/privateUserProfileRepositoryFactory'
import {
    userProfileConverterFactory,
    userProfileDatastoreFactory,
    userProfileRepositoryFactory,
} from '../../../../../factories/repositories/userProfileRepositoryFactory'
import { authUsecaseFactory } from '../../../../../factories/usecases/authUsecaseFactory'

export const createAuthHandler = (): AuthHandler => {
    const store = firestoreFactory()

    const userProfileConverter = userProfileConverterFactory()
    const userProfileDatastore = userProfileDatastoreFactory(store, userProfileConverter)
    const userProfileRepository = userProfileRepositoryFactory(userProfileDatastore)

    const privateUserProfileConverter = privateUserProfileConverterFactory()
    const privateUserProfileDatastore = privateUserProfileDatastoreFactory(
        store,
        privateUserProfileConverter
    )
    const privateUserProfileRepository = privateUserProfileRepositoryFactory(
        privateUserProfileDatastore
    )

    const authRepository = authRepositoryFactory()
    const authUsecase = authUsecaseFactory(
        authRepository,
        userProfileRepository,
        privateUserProfileRepository
    )

    return authHandlerFactory(authUsecase)
}
