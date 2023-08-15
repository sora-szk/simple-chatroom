import { UserProfilePresenter } from '../../../app/adapters/response/presenters/userProfilePresenter'
import { UserProfilePresenterImpl } from '../../api/presenters/userProfilePresenterImpl'

export const userProfilePresenterFactory = (): UserProfilePresenter =>
    new UserProfilePresenterImpl()
