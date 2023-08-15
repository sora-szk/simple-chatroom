import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { NotificationConverter } from '../../../app/adapters/firestore/converters/notificationConverter'
import { NotificationModel } from '../../../app/domain/entities/models/notificationModel'
import { NotificationRepository } from '../../../app/domain/interfaces/repository/notificationRepository'
import { NotificationRepositoryImpl } from '../../db/repositoriesImpl/notificationRepositoryImpl'
import { NotificationDatastore } from '../../db/firestore/datastore/notificationDatastore'

export const notificationConverterFactory = (): FirestoreDataConverter<NotificationModel> =>
    new NotificationConverter()

export const notificationDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<NotificationModel>
): NotificationDatastore => new NotificationDatastore(store, converter)

export const notificationRepositoryFactory = (
    datastore: NotificationDatastore
): NotificationRepository => new NotificationRepositoryImpl(datastore)
