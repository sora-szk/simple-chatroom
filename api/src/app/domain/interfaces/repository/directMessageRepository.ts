import { DirectMessageModel } from '../../entities/models/directMessageModel'

export interface DirectMessageRepository {
    create(
        data: Omit<
            DirectMessageModel,
            'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void>
    get(directMessageDocID: string): Promise<DirectMessageModel | null>
    getList(data: {
        uid1: string
        uid2: string
        fromMessageID?: number
        toMessageID?: number
    }): Promise<DirectMessageModel[]>
}
