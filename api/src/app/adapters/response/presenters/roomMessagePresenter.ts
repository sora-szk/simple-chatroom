import { RoomMessageModel } from '../../../domain/entities/models/roomMessageModel'
import { RoomMessagePresentModel } from '../models/roomMessagePresentModel'

export interface RoomMessagePresenter {
    detail(source: RoomMessageModel | null): RoomMessagePresentModel | null
    listDetails(sourceList: (RoomMessageModel | null)[]): RoomMessagePresentModel[]
}
