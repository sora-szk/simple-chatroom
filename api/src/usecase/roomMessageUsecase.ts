import admin from 'firebase-admin';
import { RoomMessageModel } from "../domain/model/roomMessageModel";
import { RoomMessageRepository } from '../domain/repository/roomMessageRepository'
import { RoomMessageDatastore } from "../infrastructure/datastore/roomMessageDatastore";

export interface RoomMessageUsecase {
    send(data: Omit<RoomMessageModel, 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    get(roomMessageID: string): Promise<RoomMessageModel | null>;
    getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]>;
}

export const createRoomMessageUsecase = (roomMessageRepository?: RoomMessageRepository): RoomMessageUsecase => {
    const repository = roomMessageRepository ?? new RoomMessageDatastore(admin.app().firestore());
    return new RoomMessageUsecaseImpl(repository);
}

export class RoomMessageUsecaseImpl implements RoomMessageUsecase {
    private roomMessageRepository: RoomMessageRepository;

    constructor(roomMessageRepository: RoomMessageRepository) {
        this.roomMessageRepository = roomMessageRepository;
    }

    async send(data: Omit<RoomMessageModel, 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.roomMessageRepository.create(data);
    }

    async get(roomMessageID: string): Promise<RoomMessageModel | null> {
        return this.roomMessageRepository.get(roomMessageID);
    }

    async getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]> {
        return this.roomMessageRepository.getList(roomID, fromMessageID, toMessageID);
    }
}