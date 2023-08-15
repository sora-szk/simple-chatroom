import { RoomMessagePresentModel } from '../../../app/adapters/response/models/roomMessagePresentModel'
import { RoomMessagePresenter } from '../../../app/adapters/response/presenters/roomMessagePresenter'
import { RoomMessageModel } from '../../../app/domain/entities/models/roomMessageModel'

export class RoomMessagePresenterImpl implements RoomMessagePresenter {
    detail(source: RoomMessageModel | null): RoomMessagePresentModel | null {
        return source
            ? {
                  room_message_doc_id: source.roomMessageDocID,
                  room_message_id: source.roomMessageID,
                  room_id: source.roomID,
                  sender: source.sender,
                  text: source.text,
                  image: source.image,
                  created_at: source.createdAt.toISOString(),
                  updated_at: source.updatedAt.toISOString(),
              }
            : null
    }

    listDetails(sourceList: (RoomMessageModel | null)[]): RoomMessagePresentModel[] {
        return sourceList
            .filter((v) => v !== null)
            .map((v) => this.detail(v)) as RoomMessagePresentModel[]
    }
}
