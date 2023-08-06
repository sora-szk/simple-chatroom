import * as admin from 'firebase-admin'
import { DirectMessageModel } from '../../domain/model/directMessageModel'
import { DirectMessageRepository } from '../../domain/repository/directMessageRepository'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { createDirectMessageConverter } from '../converter/directMessageConverter'
import { FirestoreDataConverter } from 'firebase-admin/firestore'

export const createDirectMessageDatastore = (store?: admin.firestore.Firestore, converter?: FirestoreDataConverter<DirectMessageModel>) => {
    return new DirectMessageDatastore(store ?? admin.app().firestore(), converter ?? createDirectMessageConverter())
}

export class DirectMessageDatastore implements DirectMessageRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<DirectMessageModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<DirectMessageModel>) {
        this.store = store
        this.converter = converter
    }

    async create(data: Omit<DirectMessageModel, 'directMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date()
        const directMessageColRef = this.store.collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES).withConverter(this.converter)

        await admin.firestore().runTransaction(async (transaction) => {
            const query = directMessageColRef
                .where('sender', 'in', [data.sender, data.receiver])
                .where('receiver', 'in', [data.receiver, data.sender])
            const querySnapshot = await transaction.get(query)
            const newMessageID = querySnapshot.size + 1

            const directMessageDocRef = directMessageColRef.doc()
            const directMessage: DirectMessageModel = {
                ...data,
                directMessageDocID: directMessageDocRef.id,
                directMessageID: newMessageID,
                createdAt: now,
                updatedAt: now,
            }
            transaction.create(directMessageDocRef, directMessage)
        })
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        const directMessageRef = this.store
            .collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES)
            .doc(directMessageDocID)
            .withConverter(this.converter)
        const snapshot = await directMessageRef.get()
        return snapshot.data() ?? null
    }

    async getList(uid1: string, uid2: string, fromMessageID?: number, toMessageID?: number): Promise<DirectMessageModel[]> {
        const directMessagesRef = this.store.collection(FIRESTORE_COLLECTION_NAME.DIRECT_MESSAGES).withConverter(this.converter)
        let query = directMessagesRef
            .where('sender', 'in', [uid1, uid2])
            .where('receiver', 'in', [uid1, uid2])
            .orderBy('directMessageID', 'asc')
        if (fromMessageID !== undefined) query = query.where('directMessageID', '>=', fromMessageID)
        if (toMessageID !== undefined) query = query.where('directMessageID', '<=', toMessageID)
        const querySnapshot = await query.get()
        return querySnapshot.docs.map((v) => v.data())
    }
}
