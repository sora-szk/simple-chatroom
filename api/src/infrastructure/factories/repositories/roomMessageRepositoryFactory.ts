import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { RoomMessageModel } from '../../../app/domain/entities/models/roomMessageModel'
import { RoomMessageConverter } from '../../../app/adapters/firestore/converters/roomMessageConverter'
import { RoomMessageRepositoryImpl } from '../../db/repositoriesImpl/roomMessageRepositoryImpl'
import { RoomMessageRepository } from '../../../app/domain/interfaces/repository/roomMessageRepository'
import { RoomMessageDatastore } from '../../db/firestore/datastore/roomMessageDatastore'

export const roomMessageConverterFactory = (): FirestoreDataConverter<RoomMessageModel> =>
    new RoomMessageConverter()

export const roomMessageDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<RoomMessageModel>
): RoomMessageDatastore => new RoomMessageDatastore(store, converter)

export const roomMessageRepositoryFactory = (
    datastore: RoomMessageDatastore
): RoomMessageRepository => new RoomMessageRepositoryImpl(datastore)
