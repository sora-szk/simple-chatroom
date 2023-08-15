import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import {
    notificationConverterFactory,
    notificationDatastoreFactory,
    notificationRepositoryFactory,
} from '../../../../../factories/repositories/notificationRepositoryFactory'
import { notificationUsecaseFactory } from '../../../../../factories/usecases/notificationUsecaseFactory'
import { adminNotificationHandlerFactory } from '../../../../../factories/handlers/v1/admin/adminNotifocationHandlerFactory'

export const createAdminNotificationHandler = () => {
    const converter = notificationConverterFactory()
    const store = firestoreFactory()
    const datastore = notificationDatastoreFactory(store, converter)
    const repository = notificationRepositoryFactory(datastore)
    const usecase = notificationUsecaseFactory(repository)
    return adminNotificationHandlerFactory(usecase)
}
