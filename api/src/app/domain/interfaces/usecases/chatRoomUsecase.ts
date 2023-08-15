import { ChatRoomModel } from '../../entities/models/chatRoomModel'

export interface ChatRoomUsecase {
    create(
        data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>
    ): Promise<{ roomID: string }>
    /**
     * roomのorganizerがeditorを招待する
     * @param roomID
     * @param senderUID
     * @param uid
     */
    inviteEditor(roomID: string, data: { senderUID: string; uid: string }): Promise<void>
    invite(roomID: string, data: { senderUID: string; uid: string }): Promise<void>
    expel(roomID: string, data: { senderUID: string; uid: string }): Promise<void>
    /**
     *
     * @param roomID
     * @param uid 取得ユーザのid
     * @returns 取得ユーザがorganizor、editorList、whiteListのどれかに含まれており、blackListに含まれていない場合、対象room情報を返却
     */
    getDetail(roomID: string, data: { uid: string }): Promise<ChatRoomModel | null>
    /**
     *
     * @param uid 取得ユーザのid
     * @returns 取得ユーザがorganizor、editorList、whiteListのどれかに含まれており、blackListに含まれていないroom情報を返却
     */
    getList(uid: string): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]>
}
