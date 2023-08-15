import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { notificationHandlerFactory } from '../../../../../factories/handlers/v1/app/notificationHandlerFactory'
import { notificationPresenterFactory } from '../../../../../factories/presenters/notificationPresenterFactory'
import {
    notificationConverterFactory,
    notificationDatastoreFactory,
    notificationRepositoryFactory,
} from '../../../../../factories/repositories/notificationRepositoryFactory'
import { notificationUsecaseFactory } from '../../../../../factories/usecases/notificationUsecaseFactory'

export const createNotificationHandler = () => {
    const converter = notificationConverterFactory()
    const store = firestoreFactory()
    const datastore = notificationDatastoreFactory(store, converter)
    const repository = notificationRepositoryFactory(datastore)
    const usecase = notificationUsecaseFactory(repository)
    const presenter = notificationPresenterFactory()
    return notificationHandlerFactory(usecase, presenter)
}
