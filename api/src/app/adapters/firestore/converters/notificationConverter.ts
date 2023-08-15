import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { NotificationModel } from '../../../domain/entities/models/notificationModel'

export class NotificationConverter implements FirestoreDataConverter<NotificationModel> {
    toFirestore(modelObject: NotificationModel): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt: admin.firestore.Timestamp.fromDate(modelObject.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(modelObject.updatedAt),
        }
    }

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): NotificationModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
            updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate(),
        } as NotificationModel
    }
}
