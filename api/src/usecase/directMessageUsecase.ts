import { DirectMessageModel } from "../domain/model/directMessageModel";
import { DirectMessageRepository } from "../domain/repository/directMessageRepository";
import { createDirectMessageDatastore } from '../infrastructure/datastore/directMessageDatastore';

export interface DirectMessageUsecase {
    send(data: Omit<DirectMessageModel, 'directMessageDocID' | 'directMessageID' |  'createdAt' | 'updatedAt'>): Promise<void>;
    get(directMessageID: string): Promise<DirectMessageModel | null>;
    getList(uid1: string, uid2: string, fromMessageID?: number, toMessageID?: number): Promise<DirectMessageModel[]>;
}

export const createDirectMessageUsecase = (directMessageRepository?: DirectMessageRepository): DirectMessageUsecase => {
    const repository = directMessageRepository ?? createDirectMessageDatastore()
    return new DirectMessageUsecaseImpl(repository);
}

export class DirectMessageUsecaseImpl implements DirectMessageUsecase {
    private directMessageRepository: DirectMessageRepository;

    constructor(directMessageRepository: DirectMessageRepository) {
        this.directMessageRepository = directMessageRepository;
    }

    async send(data: Omit<DirectMessageModel, 'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.directMessageRepository.create(data);
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        return this.directMessageRepository.get(directMessageDocID);
    }

    async getList(uid1: string, uid2: string, fromMessageID?: number, toMessageID?: number): Promise<DirectMessageModel[]> {
        return this.directMessageRepository.getList(uid1, uid2, fromMessageID, toMessageID);
    }
}
