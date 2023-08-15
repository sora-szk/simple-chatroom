import { DirectMessageHandler } from '../../../../../../app/adapters/handlers/v1/app/directMessageHandler'
import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { directMessageHandlerFactory } from '../../../../../factories/handlers/v1/app/directMessageHandlerFactory'
import { directMessagePresenterFactory } from '../../../../../factories/presenters/directMessagePresenterFactory'
import {
    directMessageConverterFactory,
    directMessageDatastoreFactory,
    directMessageRepositoryFactory,
} from '../../../../../factories/repositories/directMessageRepositoryFactory'
import { directMessageUsecaseFactory } from '../../../../../factories/usecases/directMessageUsecaseFactory'

export const createDirectMessageHandler = (): DirectMessageHandler => {
    const store = firestoreFactory()

    const directMessageConverter = directMessageConverterFactory()
    const directMessageDatastore = directMessageDatastoreFactory(store, directMessageConverter)
    const directMessageRepository = directMessageRepositoryFactory(directMessageDatastore)

    const directMessageUsecase = directMessageUsecaseFactory(directMessageRepository)
    const directMessagePresenter = directMessagePresenterFactory()

    return directMessageHandlerFactory(directMessageUsecase, directMessagePresenter)
}
