import * as admin from "firebase-admin";
import { PrivateUserProfileModel } from '../../domain/model/privateUserProfileModel';
import { PrivateUserProfileRepository } from '../../domain/repository/privateUserProfileRepository';
import { FIRESTORE_COLLECTION_NAME } from "../../domain/constant/firestoreCollectionName";

export const createPrivateUserProfileDatastore = (store?: admin.firestore.Firestore) => {
    return new PrivateUserProfileDatastore(store ?? admin.app().firestore())
}

export class PrivateUserProfileDatastore implements PrivateUserProfileRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(uid: string, data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid);
        const userProfileData: PrivateUserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        };
        await docRef.create(userProfileData);
    }

    async update(uid: string, data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid);
        const userProfileData: Partial<PrivateUserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        };
        await docRef.update(userProfileData);
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.PRIVATE_USER_PROFILES).doc(uid);
        const snapshot = await docRef.get();
        if (snapshot.exists) return snapshot.data() as PrivateUserProfileModel;
        return null;
    }
}
