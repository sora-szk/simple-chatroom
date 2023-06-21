import * as admin from 'firebase-admin'
import { ChatRoomModel } from "../domain/model/chatRoomModel";
import { ChatRoomRepository } from "../domain/repository/chatRoomRepository";
import { ChatRoomDatastore } from '../infrastructure/datastore/chatRoomDatastore';

export interface ChatRoomUsecase {
    create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    join(roomID: string, uid: string): Promise<void>;
    invite(roomID: string, uid: string): Promise<void>;
    expal(roomID: string, uid: string): Promise<void>;
    getDetail(roomID: string): Promise<ChatRoomModel | null>;
    getList(): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]>;
}

export const createChatRoomUsecase = (chatRoomRepository?: ChatRoomRepository): ChatRoomUsecase => {
    const repository = chatRoomRepository ?? new ChatRoomDatastore(admin.app().firestore())
    return new ChatRoomUsecaseImpl(repository);
}

export class ChatRoomUsecaseImpl implements ChatRoomUsecase {
    private chatRoomRepository: ChatRoomRepository;

    constructor(chatRoomRepository: ChatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    async create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.chatRoomRepository.create(data);
    }

    async join(roomID: string, uid: string): Promise<void> {
        await this.chatRoomRepository.join(roomID, uid);
    }

    async invite(roomID: string, uid: string): Promise<void> {
        await this.chatRoomRepository.invite(roomID, uid);
    }

    async expal(roomID: string, uid: string): Promise<void> {
        await this.chatRoomRepository.expal(roomID, uid);
    }

    async getDetail(roomID: string): Promise<ChatRoomModel | null> {
        return this.chatRoomRepository.getDetail(roomID);
    }

    async getList(): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]> {
        return this.chatRoomRepository.getList();
    }
}
