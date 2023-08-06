import * as admin from 'firebase-admin'
import { UserProfileModel } from '../../domain/model/userProfileModel'
import { UserProfileRepository } from '../../domain/repository/userProfileRepository'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { createUserProfileConverter } from '../converter/userProfileConverter'

export const createUserProfileDatastore = (store?: admin.firestore.Firestore, converter?: FirestoreDataConverter<UserProfileModel>) => {
    return new UserProfileDatastore(store ?? admin.app().firestore(), converter ?? createUserProfileConverter())
}

export class UserProfileDatastore implements UserProfileRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<UserProfileModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<UserProfileModel>) {
        this.store = store
        this.converter = converter
    }

    async create(uid: string, data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date()
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid).withConverter(this.converter)
        const userProfileData: UserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(userProfileData)
    }

    async update(uid: string, data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid).withConverter(this.converter)
        const userProfileData: Partial<UserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(userProfileData)
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid).withConverter(this.converter)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }
}
