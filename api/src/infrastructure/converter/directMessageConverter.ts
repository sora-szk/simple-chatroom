import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { DirectMessageModel } from '../../domain/model/directMessageModel'

export const createDirectMessageConverter = (): FirestoreDataConverter<DirectMessageModel> => new DirectMessageConverter()

class DirectMessageConverter implements FirestoreDataConverter<DirectMessageModel> {
    toFirestore(modelObject: DirectMessageModel): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt: admin.firestore.Timestamp.fromDate(modelObject.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(modelObject.updatedAt),
        }
    }

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): DirectMessageModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
            updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate(),
        } as DirectMessageModel
    }
}
