import { DirectMessageModel } from '../../entities/models/directMessageModel'

export interface DirectMessageUsecase {
    send(
        data: Omit<
            DirectMessageModel,
            'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void>
    get(directMessageID: string): Promise<DirectMessageModel | null>
    getList(data: {
        uid1: string
        uid2: string
        fromMessageID?: number
        toMessageID?: number
    }): Promise<DirectMessageModel[]>
}
