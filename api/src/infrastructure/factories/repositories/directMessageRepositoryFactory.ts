import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { DirectMessageModel } from '../../../app/domain/entities/models/directMessageModel'
import { DirectMessageRepositoryImpl } from '../../db/repositoriesImpl/directMessageRepositoryImpl'
import { DirectMessageConverter } from '../../../app/adapters/firestore/converters/directMessageConverter'
import { DirectMessageRepository } from '../../../app/domain/interfaces/repository/directMessageRepository'
import { DirectMessageDatastore } from '../../db/firestore/datastore/directMessageDatastore'

export const directMessageConverterFactory = (): FirestoreDataConverter<DirectMessageModel> =>
    new DirectMessageConverter()

export const directMessageDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<DirectMessageModel>
): DirectMessageDatastore => new DirectMessageDatastore(store, converter)

export const directMessageRepositoryFactory = (
    datastore: DirectMessageDatastore
): DirectMessageRepository => new DirectMessageRepositoryImpl(datastore)
