import * as admin from 'firebase-admin'
import { PrivateUserProfileModel } from '../../domain/model/privateUserProfileModel'
import { PrivateUserProfileRepository } from '../../domain/repository/privateUserProfileRepository'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { createPrivateUserProfileConverter } from '../converter/privateUserProfileConverter'

export const createPrivateUserProfileDatastore = (
    store?: admin.firestore.Firestore,
    converter?: FirestoreDataConverter<PrivateUserProfileModel>
) => {
    return new PrivateUserProfileDatastore(store ?? admin.app().firestore(), converter ?? createPrivateUserProfileConverter())
}

export class PrivateUserProfileDatastore implements PrivateUserProfileRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<PrivateUserProfileModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<PrivateUserProfileModel>) {
        this.store = store
        this.converter = converter
    }

    async create(uid: string, data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date()
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid).withConverter(this.converter)
        const userProfileData: PrivateUserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(userProfileData)
    }

    async update(uid: string, data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid).withConverter(this.converter)
        const userProfileData: Partial<PrivateUserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(userProfileData)
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid).withConverter(this.converter)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }
}
