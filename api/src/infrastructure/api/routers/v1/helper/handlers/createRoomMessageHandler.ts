import { RoomMessageHandler } from '../../../../../../app/adapters/handlers/v1/app/roomMessageHandler'
import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { roomMessageHandlerFactory } from '../../../../../factories/handlers/v1/app/roomMessageHandlerFactory'
import { roomMessagePresenterFactory } from '../../../../../factories/presenters/roomMessagePresenterFactory'
import {
    chatRoomConverterFactory,
    chatRoomDatastoreFactory,
    chatRoomRepositoryFactory,
} from '../../../../../factories/repositories/chatRoomRepositoryFactory'
import {
    roomMessageConverterFactory,
    roomMessageDatastoreFactory,
    roomMessageRepositoryFactory,
} from '../../../../../factories/repositories/roomMessageRepositoryFactory'
import { roomMessageUsecaseFactory } from '../../../../../factories/usecases/roomMessageUsecaseFactory'

export const createRoomMessageHandler = (): RoomMessageHandler => {
    const store = firestoreFactory()

    const chatRoomConverter = chatRoomConverterFactory()
    const chatRoomDatastore = chatRoomDatastoreFactory(store, chatRoomConverter)
    const chatRoomRepository = chatRoomRepositoryFactory(chatRoomDatastore)

    const roomMessageConverter = roomMessageConverterFactory()
    const roomMessageDatastore = roomMessageDatastoreFactory(store, roomMessageConverter)
    const roomMessageRepository = roomMessageRepositoryFactory(roomMessageDatastore)

    const roomMessageUsecase = roomMessageUsecaseFactory(chatRoomRepository, roomMessageRepository)
    const roomMessagePresenter = roomMessagePresenterFactory()

    return roomMessageHandlerFactory(roomMessageUsecase, roomMessagePresenter)
}
