import admin from 'firebase-admin';
import { RoomMessageModel } from '../../domain/model/roomMessageModel';
import { RoomMessageRepository } from '../../domain/repository/roomMessageRepository';
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName';

export const createRoomMessageDatastore = (store?: admin.firestore.Firestore) => {
    return new RoomMessageDatastore(store ?? admin.app().firestore())
}

export class RoomMessageDatastore implements RoomMessageRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(data: Omit<RoomMessageModel, 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const messageColRef = this.store
            .collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES);

        await admin.firestore().runTransaction(async (transaction) => {
            const querySnapshot = await transaction.get(messageColRef);
            const newMessageID = querySnapshot.size + 1;

            const messageDocRef = messageColRef.doc();
            const message: RoomMessageModel = {
                ...data,
                roomMessageDocID: messageColRef.id,
                roomMessageID: newMessageID,
                createdAt: now,
                updatedAt: now,
            };
            transaction.create(messageDocRef, message);
        });
    }

    async get(roomMessageID: string): Promise<RoomMessageModel | null> {
        const roomMessageSnapshot = await this.store.collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES).where('roomMessageID', '==', roomMessageID).get();
        if (roomMessageSnapshot.empty) return null
        const message = roomMessageSnapshot.docs[0].data() as RoomMessageModel;
        return message;
    }

    async getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]> {
        const roomMessagesRef = this.store
            .collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES)
            .where("roomID", "==", roomID);
        let query = roomMessagesRef.orderBy('roomMessageID', 'asc');
        if (fromMessageID !== undefined) query = query.where('roomMessageID', '>=', fromMessageID);
        if (toMessageID !== undefined) query = query.where('roomMessageID', '<=', toMessageID);
        const messagesSnapshot = await query.get();

        const messages: RoomMessageModel[] = [];
        messagesSnapshot.forEach((doc) =>
            messages.push(doc.data() as RoomMessageModel)
        );
        return messages;
    }
}
