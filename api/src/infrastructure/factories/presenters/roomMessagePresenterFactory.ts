import { RoomMessagePresenter } from '../../../app/adapters/response/presenters/roomMessagePresenter'
import { RoomMessagePresenterImpl } from '../../api/presenters/roomMessagePresenterImpl'

export const roomMessagePresenterFactory = (): RoomMessagePresenter =>
    new RoomMessagePresenterImpl()
