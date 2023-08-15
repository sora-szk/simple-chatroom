import { DirectMessagePresenter } from '../../../app/adapters/response/presenters/directMessagePresenter'
import { DirectMessagePresenterImpl } from '../../api/presenters/directMessagePresenterImpl'

export const directMessagePresenterFactory = (): DirectMessagePresenter =>
    new DirectMessagePresenterImpl()
