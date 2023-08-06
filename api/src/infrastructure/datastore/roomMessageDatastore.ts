import admin from 'firebase-admin'
import { RoomMessageModel } from '../../domain/model/roomMessageModel'
import { RoomMessageRepository } from '../../domain/repository/roomMessageRepository'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { createRoomMessageConverter } from '../converter/roomMessageConverter'

export const createRoomMessageDatastore = (store?: admin.firestore.Firestore, converter?: FirestoreDataConverter<RoomMessageModel>) => {
    return new RoomMessageDatastore(store ?? admin.app().firestore(), converter ?? createRoomMessageConverter())
}

export class RoomMessageDatastore implements RoomMessageRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<RoomMessageModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<RoomMessageModel>) {
        this.store = store
        this.converter = converter
    }

    async create(data: Omit<RoomMessageModel, 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date()
        const colRef = this.store.collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES).withConverter(this.converter)

        await admin.firestore().runTransaction(async (transaction) => {
            const querySnapshot = await transaction.get(colRef)
            const newMessageID = querySnapshot.size + 1

            const message: RoomMessageModel = {
                ...data,
                roomMessageDocID: colRef.id,
                roomMessageID: newMessageID,
                createdAt: now,
                updatedAt: now,
            }
            transaction.create(colRef.doc(), message)
        })
    }

    async get(roomMessageID: string): Promise<RoomMessageModel | null> {
        const colRef = this.store.collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES).withConverter(this.converter)
        const querySnapshot = await colRef.where('roomMessageID', '==', roomMessageID).get()
        return querySnapshot.docs[0]?.data() ?? null
    }

    async getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]> {
        const colRef = this.store
            .collection(FIRESTORE_COLLECTION_NAME.ROOM_MESSAGES)
            .where('roomID', '==', roomID)
            .withConverter(this.converter)
        let query = colRef.orderBy('roomMessageID', 'asc')
        if (fromMessageID !== undefined) query = query.where('roomMessageID', '>=', fromMessageID)
        if (toMessageID !== undefined) query = query.where('roomMessageID', '<=', toMessageID)
        const querySnapshot = await query.get()
        return querySnapshot.docs.map((v) => v.data())
    }
}
