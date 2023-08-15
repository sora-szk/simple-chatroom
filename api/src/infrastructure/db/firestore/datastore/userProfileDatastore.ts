import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'
import { UserProfileModel } from '../../../../app/domain/entities/models/userProfileModel'

export class UserProfileDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: FirestoreDataConverter<UserProfileModel>
    ) {}

    async create(
        uid: string,
        data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        const now = new Date()
        const docRef = this._getDocRef(uid)
        const userProfileData: UserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(userProfileData)
    }

    async update(
        uid: string,
        data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        const docRef = this._getDocRef(uid)
        const userProfileData: Partial<UserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(userProfileData)
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        const docRef = this._getDocRef(uid)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.USER_PROFILES)
            .withConverter(this.converter)
    }

    private _getDocRef(docID: string) {
        return this._getColRef().doc(docID)
    }
}
