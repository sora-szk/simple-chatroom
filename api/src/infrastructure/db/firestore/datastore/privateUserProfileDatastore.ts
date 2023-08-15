import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'
import { PrivateUserProfileModel } from '../../../../app/domain/entities/models/privateUserProfileModel'

export class PrivateUserProfileDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: FirestoreDataConverter<PrivateUserProfileModel>
    ) {}

    async create(
        uid: string,
        data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        const now = new Date()
        const docRef = this._getDocRef(uid)
        const userProfileData: PrivateUserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(userProfileData)
    }

    async update(
        uid: string,
        data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        const docRef = this._getDocRef(uid)
        const userProfileData: Partial<PrivateUserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(userProfileData)
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        const docRef = this._getDocRef(uid)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.PRIVATE_USER_PROFILES)
            .withConverter(this.converter)
    }

    private _getDocRef(docID: string) {
        return this._getColRef().doc(docID)
    }
}
