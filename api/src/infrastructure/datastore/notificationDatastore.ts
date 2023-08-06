import admin from 'firebase-admin';
import { NotificationRepository } from '../../domain/repository/notificationRepository';
import { NotificationModel } from '../../domain/model/notificationModel';
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName';

export const createNotificationDatastore = (store?: admin.firestore.Firestore) => {
    return new NotificationDatastore(store ?? admin.app().firestore())
}

export class NotificationDatastore implements NotificationRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const notificationRef = await this.store.collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS).doc();
        const notification: NotificationModel = {
            ...data,
            notificationID: notificationRef.id,
            createdAt: now,
            updatedAt: now,
        };
        await notificationRef.create(notification);
    }

    async get(notificationID: string): Promise<NotificationModel | null> {
        const notificationSnapshot = await this.store.collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS).doc(notificationID).get();
        if (notificationSnapshot.exists) return notificationSnapshot.data() as NotificationModel;
        return null;
    }

    async getAll(receiver: string): Promise<NotificationModel[]> {
        const querySnapshot = await this.store
            .collection(FIRESTORE_COLLECTION_NAME.NOTIFICATIONS)
            .where('receiver', '==', receiver)
            .get();

        const notifications: NotificationModel[] = [];
        querySnapshot.forEach((doc) =>
            notifications.push(doc.data() as NotificationModel)
        );
        return notifications;
    }
}
