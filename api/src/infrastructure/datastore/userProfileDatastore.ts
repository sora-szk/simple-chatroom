import * as admin from "firebase-admin";
import { UserProfileModel } from '../../domain/model/userProfileModel';
import { UserProfileRepository } from '../../domain/repository/userProfileRepository';
import { FIRESTORE_COLLECTION_NAME } from "../../domain/constant/firestoreCollectionName";

export const createUserProfileDatastore = (store?: admin.firestore.Firestore) => {
    return new UserProfileDatastore(store ?? admin.app().firestore())
}

export class UserProfileDatastore implements UserProfileRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(uid: string, data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid);
        const userProfileData: UserProfileModel = {
            ...data,
            uid: uid,
            createdAt: now,
            updatedAt: now,
        };
        await docRef.set(userProfileData);
    }

    async update(uid: string, data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid);
        const userProfileData: Partial<UserProfileModel> = {
            ...data,
            updatedAt: new Date(),
        };
        await docRef.update(userProfileData);
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.USER_PROFILES).doc(uid);
        const snapshot = await docRef.get();
        if (snapshot.exists) return snapshot.data() as UserProfileModel;
        return null;
    }
}
