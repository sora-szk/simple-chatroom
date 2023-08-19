import admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'
import { RoomMessageModel } from '../../../../app/domain/entities/models/roomMessageModel'
import { handleFirestoreError } from './helpers/handleFirestoreError'

export class RoomMessageDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: FirestoreDataConverter<RoomMessageModel>
    ) {}

    async create(
        data: Omit<
            RoomMessageModel,
            'roomMessageID' | 'roomMessageDocID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        const now = new Date()
        const docRef = this._getDocRef()
        await this.store
            .runTransaction(async (transaction) => {
                const newMessageID = await this._incrementCounter(data.roomID, transaction)
                const message: RoomMessageModel = {
                    ...data,
                    roomMessageDocID: docRef.id,
                    roomMessageID: newMessageID,
                    createdAt: now,
                    updatedAt: now,
                }
                transaction.create(docRef, message)
            })
            .catch(handleFirestoreError)
    }

    async get(roomMessageID: string): Promise<RoomMessageModel | null> {
        const colRef = this._getColRef()
        const snapshot = await colRef
            .where('roomMessageID', '==', roomMessageID)
            .get()
            .catch(handleFirestoreError)
        return snapshot.docs[0]?.data() ?? null
    }

    async getList(
        roomID: string,
        data: { fromMessageID?: number; toMessageID?: number }
    ): Promise<RoomMessageModel[]> {
        const { fromMessageID, toMessageID } = data
        const colRef = this._getColRef()
        let query = colRef.where('roomID', '==', roomID).orderBy('roomMessageID', 'asc')
        if (fromMessageID !== undefined) query = query.where('roomMessageID', '>=', fromMessageID)
        if (toMessageID !== undefined) query = query.where('roomMessageID', '<=', toMessageID)
        const snapshot = await query.get().catch(handleFirestoreError)
        return snapshot.docs.map((v) => v.data())
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.ROOM_MESSAGES)
            .withConverter(this.converter)
    }

    private _getDocRef() {
        return this._getColRef().doc()
    }

    /**
     * roomMesageIDのカウンタです。
     * - roomごとに別々のドキュメントでカウントします
     * - 一意性を保証するため、transactinを使用します。
     */
    private async _incrementCounter(
        roomID: string,
        transaction: admin.firestore.Transaction
    ): Promise<number> {
        const docRef = this.store
            .collection(FIRESTORE_COLLECTION_NAMES.ROOM_MESSAGE_COUNTERS)
            .doc(roomID)
        const counterDoc = await transaction.get(docRef)
        const currentMessageID = counterDoc.data()?.latestMessageID ?? 0
        const nextMessageID = currentMessageID + 1
        transaction.set(docRef, { latestMessageID: nextMessageID }, { merge: true })
        return nextMessageID
    }
}
