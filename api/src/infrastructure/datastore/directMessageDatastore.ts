import * as admin from 'firebase-admin';
import { DirectMessageModel } from '../../domain/model/directMessageModel';
import { DirectMessageRepository } from '../../domain/repository/directMessageRepository';
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName';

export class DirectMessageDatastore implements DirectMessageRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(data: Omit<DirectMessageModel, 'directMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const directMessageColRef = this.store.collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES);

        await admin.firestore().runTransaction(async (transaction) => {
            const query = directMessageColRef
                .where('sender', 'in', [data.sender, data.receiver])
                .where('receiver', 'in', [data.receiver, data.sender]);
            const querySnapshot = await transaction.get(query);
            const newMessageID = querySnapshot.size + 1;

            const directMessageDocRef = directMessageColRef.doc();
            const directMessage: DirectMessageModel = {
                ...data,
                directMessageDocID: directMessageDocRef.id,
                directMessageID: newMessageID,
                createdAt: now,
                updatedAt: now,
            };
            transaction.set(directMessageDocRef, directMessage);
        });
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        const directMessageRef = this.store
            .collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES)
            .doc(directMessageDocID);
        const snapshot = await directMessageRef.get();
        if (snapshot.exists) return snapshot.data() as DirectMessageModel;
        return null;
    }

    async getList(uid1: string, uid2: string, fromMessageID?: number, toMessageID?: number): Promise<DirectMessageModel[]> {
        const directMessagesRef = this.store.collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES);
        let query = directMessagesRef
            .where('sender', 'in', [uid1, uid2])
            .where('receiver', 'in', [uid1, uid2])
            .orderBy('directMessageID', 'asc');
        if (fromMessageID !== undefined) query = query.where('directMessageID', '>=', fromMessageID);
        if (toMessageID !== undefined) query = query.where('directMessageID', '<=', toMessageID);
        const querySnapshot = await query.get();

        const directMessages: DirectMessageModel[] = [];
        querySnapshot.forEach((doc) =>
            directMessages.push(doc.data() as DirectMessageModel)
        );
        return directMessages;
    }
}
