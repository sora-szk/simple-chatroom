import { ChatRoomModel } from '../../../domain/entities/models/chatRoomModel'
import {
    ChatRoomCreateResultPresentModel,
    ChatRoomSummaryPresentModel,
    ChatRoomPresentModel,
} from '../models/chatRoomPresentModel'

export interface ChatRoomPresenter {
    createResult(source: { roomID: string }): ChatRoomCreateResultPresentModel
    summary(
        source: Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'> | null
    ): ChatRoomSummaryPresentModel | null
    summaryList(
        source: (Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'> | null)[]
    ): ChatRoomSummaryPresentModel[]
    detail(source: ChatRoomModel | null): ChatRoomPresentModel | null
}
