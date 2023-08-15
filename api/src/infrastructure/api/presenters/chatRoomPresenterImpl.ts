import {
    ChatRoomCreateResultPresentModel,
    ChatRoomSummaryPresentModel,
    ChatRoomPresentModel,
} from '../../../app/adapters/response/models/chatRoomPresentModel'
import { ChatRoomPresenter } from '../../../app/adapters/response/presenters/chatRoomPresenter'
import { ChatRoomModel } from '../../../app/domain/entities/models/chatRoomModel'

export class ChatRoomPresenterImpl implements ChatRoomPresenter {
    createResult(source: { roomID: string }): ChatRoomCreateResultPresentModel {
        return {
            room_id: source.roomID,
        }
    }

    summary(
        source: Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'> | null
    ): ChatRoomSummaryPresentModel | null {
        return source
            ? {
                  room_id: source.roomID,
                  name: source.name,
                  created_at: source.createdAt.toISOString(),
              }
            : null
    }

    summaryList(
        source: (Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'> | null)[]
    ): ChatRoomSummaryPresentModel[] {
        return source
            .filter((v) => v !== null)
            .map((v) => this.summary(v)) as ChatRoomSummaryPresentModel[]
    }

    detail(source: ChatRoomModel | null): ChatRoomPresentModel | null {
        return source
            ? {
                  room_id: source.roomID,
                  name: source.name,
                  organizer: source.organizer,
                  editor_list: source.editorList,
                  white_list: source.whiteList,
                  black_list: source.blackList,
                  created_at: source.createdAt.toISOString(),
                  updated_at: source.updatedAt.toISOString(),
              }
            : null
    }
}
