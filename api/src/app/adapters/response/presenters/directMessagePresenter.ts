import { DirectMessageModel } from '../../../domain/entities/models/directMessageModel'
import { DirectMessagePresentModel } from '../models/directMessagePresentModel'

export interface DirectMessagePresenter {
    detail(source: DirectMessageModel | null): DirectMessagePresentModel | null
    listDetails(source: (DirectMessageModel | null)[]): DirectMessagePresentModel[]
}
