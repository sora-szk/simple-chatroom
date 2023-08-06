import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { PrivateUserProfileModel } from '../../domain/model/privateUserProfileModel'

export const createPrivateUserProfileConverter = (): FirestoreDataConverter<PrivateUserProfileModel> => new PrivateUserProfileConverter()

class PrivateUserProfileConverter implements FirestoreDataConverter<PrivateUserProfileModel> {
    toFirestore(modelObject: PrivateUserProfileModel): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt: admin.firestore.Timestamp.fromDate(modelObject.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(modelObject.updatedAt),
        }
    }

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): PrivateUserProfileModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
            updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate(),
        } as PrivateUserProfileModel
    }
}
