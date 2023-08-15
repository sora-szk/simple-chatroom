import { ChatRoomHandler } from '../../../../../../app/adapters/handlers/v1/app/chatRoomHandler'
import { firestoreFactory } from '../../../../../factories/db/firestoreFactory'
import { chatRoomHandlerFactory } from '../../../../../factories/handlers/v1/app/chatRoomHandlerFactory'
import { chatRoomPresenterFactory } from '../../../../../factories/presenters/chatRoomPresenterFactory'
import {
    chatRoomConverterFactory,
    chatRoomDatastoreFactory,
    chatRoomRepositoryFactory,
} from '../../../../../factories/repositories/chatRoomRepositoryFactory'
import { chatRoomUsecaseFactory } from '../../../../../factories/usecases/chatRoomUsecaseFactory'

export const createChatRoomHandler = (): ChatRoomHandler => {
    const store = firestoreFactory()

    const chatRoomConverter = chatRoomConverterFactory()
    const chatRoomDatastore = chatRoomDatastoreFactory(store, chatRoomConverter)
    const chatRoomRepository = chatRoomRepositoryFactory(chatRoomDatastore)

    const chatRoomUsecase = chatRoomUsecaseFactory(chatRoomRepository)
    const chatRoomPresenter = chatRoomPresenterFactory()

    return chatRoomHandlerFactory(chatRoomUsecase, chatRoomPresenter)
}
