import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { ChatRoomModel } from '../../domain/model/chatRoomModel';
import { ChatRoomRepository } from '../../domain/repository/chatRoomRepository';
import { FIRESTORE_COLLECTION_NAME } from "../../domain/constant/firestoreCollectionName";
import { createAppError } from "../../domain/appError";

export const createChatRoomDatastore = (store?: admin.firestore.Firestore) => {
    return new ChatRoomDatastore(store ?? admin.app().firestore())
}

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

    async inviteEditor(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID);
        await docRef.update({ editorList: FieldValue.arrayUnion(uid) });
    }

    async invite(roomID: string, uid: string): Promise<void> {
        const chatRoomInfo = await this.getDetail(roomID)
        if(chatRoomInfo === null) throw createAppError(404101)
        if(chatRoomInfo.whiteList === null) throw createAppError(403102)
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

    async getList(): Promise<ChatRoomModel[]> {
        const querySnapshot = await this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).get();
        const chatRoomList: ChatRoomModel[] = [];
        querySnapshot.forEach((doc) => {
            const chatRoomData = doc.data() as ChatRoomModel;
            chatRoomList.push(chatRoomData);
        });
        return chatRoomList;
    }
}
