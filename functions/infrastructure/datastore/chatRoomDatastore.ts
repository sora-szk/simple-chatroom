import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { ChatRoomModel } from '../../domain/model/chatRoomModel';
import { ChatRoomRepository } from '../../domain/repository/chatRoomRepository';
import { FIRESTORE_COLLECTION_NAME } from "../../domain/constant/firestoreCollectionName";

export class ChatRoomDatastore implements ChatRoomRepository {
    private store: admin.firestore.Firestore;
    constructor(store: admin.firestore.Firestore) {
        this.store = store;
    }

    async create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date();
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc();
        const chatRoomData: ChatRoomModel = {
            ...data,
            roomID: docRef.id,
            createdAt: now,
            updatedAt: now,
        };
        await docRef.set(chatRoomData);
    }

    async update(roomID: string, data: Partial<Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        const chatRoomData: Partial<ChatRoomModel> = {
            ...data,
            updatedAt: new Date(),
        };
        await docRef.update(chatRoomData);
    }

    async join(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        await docRef.update({ editorList: FieldValue.arrayUnion(uid) });
    }

    async invite(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        await docRef.update({ whiteList: FieldValue.arrayUnion(uid) });
    }

    async expal(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        await docRef.update({ editorList: FieldValue.arrayRemove(uid), whiteList: FieldValue.arrayRemove(uid), blackList: FieldValue.arrayUnion(uid) });
    }

    async getDetail(roomID: string): Promise<ChatRoomModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        const snapshot = await docRef.get();
        if (snapshot.exists) return snapshot.data() as ChatRoomModel;
        return null;
    }

    async getList(): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]> {
        const querySnapshot = await this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).get();
        const chatRoomList: Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[] = [];
        querySnapshot.forEach((doc) => {
            const { roomID, name, createdAt } = doc.data() as ChatRoomModel;
            chatRoomList.push({ roomID, name, createdAt });
        });
        return chatRoomList;
    }
}
