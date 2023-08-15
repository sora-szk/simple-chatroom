import admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'
import { NotificationModel } from '../../../../app/domain/entities/models/notificationModel'

export class NotificationDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: FirestoreDataConverter<NotificationModel>
    ) {}

    async create(
        data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        const now = new Date()
        const docRef = this._getDocRef()
        const notification: NotificationModel = {
            ...data,
            notificationID: docRef.id,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(notification)
    }

    async get(notificationID: string): Promise<NotificationModel | null> {
        const docRef = this._getDocRef(notificationID)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    async getAll(receiver: string): Promise<NotificationModel[]> {
        const colRef = this._getColRef()
        const querySnapshot = await colRef.where('receiver', '==', receiver).get()
        return querySnapshot.docs.map((v) => v.data())
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.NOTIFICATIONS)
            .withConverter(this.converter)
    }

    private _getDocRef(docID?: string) {
        const colRef = this._getColRef()
        return docID ? colRef.doc(docID) : colRef.doc()
    }
}
