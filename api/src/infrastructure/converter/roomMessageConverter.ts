import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { RoomMessageModel } from '../../domain/model/roomMessageModel'

export const createRoomMessageConverter = (): FirestoreDataConverter<RoomMessageModel> => new RoomMessageConverter()

class RoomMessageConverter implements FirestoreDataConverter<RoomMessageModel> {
    toFirestore(modelObject: RoomMessageModel): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt: admin.firestore.Timestamp.fromDate(modelObject.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(modelObject.updatedAt),
        }
    }

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): RoomMessageModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
            updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate(),
        } as RoomMessageModel
    }
}
