import * as admin from 'firebase-admin'
import { DirectMessageModel } from '../../../../app/domain/entities/models/directMessageModel'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'
import { handleFirestoreError } from './helpers/handleFirestoreError'

export class DirectMessageDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: admin.firestore.FirestoreDataConverter<DirectMessageModel>
    ) {}

    async create(
        data: Omit<
            DirectMessageModel,
            'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        const now = new Date()
        const docRef = this._getDocRef()
        await this.store
            .runTransaction(async (transaction) => {
                const newMessageID = await this._incrementCounter(transaction)
                const directMessage: DirectMessageModel = {
                    ...data,
                    directMessageDocID: docRef.id,
                    directMessageID: newMessageID,
                    createdAt: now,
                    updatedAt: now,
                }
                transaction.create(docRef, directMessage)
            })
            .catch(handleFirestoreError)
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        const docRef = this._getDocRef(directMessageDocID)
        const snapshot = await docRef.get().catch(handleFirestoreError)
        return snapshot.data() ?? null
    }

    async getList(data: {
        uid1: string
        uid2: string
        fromMessageID?: number
        toMessageID?: number
    }): Promise<DirectMessageModel[]> {
        const { uid1, uid2, fromMessageID, toMessageID } = data
        const colRef = this._getColRef()
        let query = colRef
            .where('sender', 'in', [uid1, uid2])
            .where('receiver', 'in', [uid1, uid2])
            .orderBy('directMessageID', 'asc')
        if (fromMessageID !== undefined) query = query.where('directMessageID', '>=', fromMessageID)
        if (toMessageID !== undefined) query = query.where('directMessageID', '<=', toMessageID)
        const querySnapshot = await query.get().catch(handleFirestoreError)
        return querySnapshot.docs.map((v) => v.data())
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.DIRECT_MESSAGES)
            .withConverter(this.converter)
    }

    private _getDocRef(docID?: string) {
        const colRef = this._getColRef()
        return docID ? colRef.doc(docID) : colRef.doc()
    }

    /**
     * directMessageIDのカウンタです。
     * - roomごとに別々のドキュメントでカウントします
     * - 一意性を保証するため、transactinを使用します。
     */
    private async _incrementCounter(transaction: admin.firestore.Transaction): Promise<number> {
        const docRef = this.store
            .collection(FIRESTORE_COLLECTION_NAMES.COUNTERS)
            .doc(FIRESTORE_COLLECTION_NAMES.DIRECT_MESSAGES)
        const counterDoc = await transaction.get(docRef)
        const currentMessageID = counterDoc.data()?.latestMessageID ?? 0
        const nextMessageID = currentMessageID + 1
        transaction.set(docRef, { latestMessageID: nextMessageID }, { merge: true })
        return nextMessageID
    }
}
