import { DirectMessageModel } from '../domain/entities/models/directMessageModel'
import { DirectMessageRepository } from '../domain/interfaces/repository/directMessageRepository'
import { DirectMessageUsecase } from '../domain/interfaces/usecases/directMessageUsecase'

export class DirectMessageInteractor implements DirectMessageUsecase {
    constructor(private directMessageRepository: DirectMessageRepository) {}

    async send(
        data: Omit<
            DirectMessageModel,
            'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        await this.directMessageRepository.create(data)
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        return this.directMessageRepository.get(directMessageDocID)
    }

    async getList(data: {
        uid1: string
        uid2: string
        fromMessageID?: number
        toMessageID?: number
    }): Promise<DirectMessageModel[]> {
        return this.directMessageRepository.getList(data)
    }
}
