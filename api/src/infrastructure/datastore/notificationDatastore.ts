import admin from 'firebase-admin'
import { NotificationRepository } from '../../domain/repository/notificationRepository'
import { NotificationModel } from '../../domain/model/notificationModel'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { createNotificationConverter } from '../converter/notificationConverter'

export const createNotificationDatastore = (store?: admin.firestore.Firestore, converter?: FirestoreDataConverter<NotificationModel>) => {
    return new NotificationDatastore(store ?? admin.app().firestore(), converter ?? createNotificationConverter())
}

export class NotificationDatastore implements NotificationRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<NotificationModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<NotificationModel>) {
        this.store = store
        this.converter = converter
    }

    async create(data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date()
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS).doc().withConverter(this.converter)
        const notification: NotificationModel = {
            ...data,
            notificationID: docRef.id,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(notification)
    }

    async get(notificationID: string): Promise<NotificationModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS).doc(notificationID).withConverter(this.converter)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    async getAll(receiver: string): Promise<NotificationModel[]> {
        const colRef = this.store.collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS).withConverter(this.converter)
        const querySnapshot = await colRef.where('receiver', '==', receiver).get()
        return querySnapshot.docs.map((v) => v.data())
    }
}
