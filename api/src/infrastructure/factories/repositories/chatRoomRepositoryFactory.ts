import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { ChatRoomModel } from '../../../app/domain/entities/models/chatRoomModel'
import { ChatRoomRepositoryImpl } from '../../db/repositoriesImpl/chatRoomRepositoryImpl'
import { ChatRoomConverter } from '../../../app/adapters/firestore/converters/chatRoomConverter'
import { ChatRoomRepository } from '../../../app/domain/interfaces/repository/chatRoomRepository'
import { ChatRoomDatastore } from '../../db/firestore/datastore/chatRoomDatastore'

export const chatRoomConverterFactory = (): FirestoreDataConverter<ChatRoomModel> =>
    new ChatRoomConverter()

export const chatRoomDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<ChatRoomModel>
): ChatRoomDatastore => new ChatRoomDatastore(store, converter)

export const chatRoomRepositoryFactory = (datastore: ChatRoomDatastore): ChatRoomRepository =>
    new ChatRoomRepositoryImpl(datastore)
