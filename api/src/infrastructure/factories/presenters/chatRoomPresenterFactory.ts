import { ChatRoomPresenter } from '../../../app/adapters/response/presenters/chatRoomPresenter'
import { ChatRoomPresenterImpl } from '../../api/presenters/chatRoomPresenterImpl'

export const chatRoomPresenterFactory = (): ChatRoomPresenter => new ChatRoomPresenterImpl()
