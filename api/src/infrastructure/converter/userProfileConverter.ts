import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { UserProfileModel } from '../../domain/model/userProfileModel'

export const createUserProfileConverter = (): FirestoreDataConverter<UserProfileModel> => new UserProfileConverter()

class UserProfileConverter implements FirestoreDataConverter<UserProfileModel> {
    toFirestore(modelObject: UserProfileModel): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt: admin.firestore.Timestamp.fromDate(modelObject.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(modelObject.updatedAt),
        }
    }

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): UserProfileModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
            updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate(),
        } as UserProfileModel
    }
}
