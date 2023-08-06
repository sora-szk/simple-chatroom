import * as admin from 'firebase-admin'
import { FieldValue, FirestoreDataConverter } from 'firebase-admin/firestore'
import { ChatRoomModel } from '../../domain/model/chatRoomModel'
import { ChatRoomRepository } from '../../domain/repository/chatRoomRepository'
import { FIRESTORE_COLLECTION_NAME } from '../../domain/constant/firestoreCollectionName'
import { createAppError } from '../../domain/appError'
import { createChatRoomConverter } from '../converter/chatRoomConverter'

export const createChatRoomDatastore = (store?: admin.firestore.Firestore, converter?: FirestoreDataConverter<ChatRoomModel>) => {
    return new ChatRoomDatastore(store ?? admin.app().firestore(), converter ?? createChatRoomConverter())
}

export class ChatRoomDatastore implements ChatRoomRepository {
    private store: admin.firestore.Firestore
    private converter: FirestoreDataConverter<ChatRoomModel>
    constructor(store: admin.firestore.Firestore, converter: FirestoreDataConverter<ChatRoomModel>) {
        this.store = store
        this.converter = converter
    }

    async create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<{ roomID: string }> {
        const now = new Date()
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc().withConverter(this.converter)
        const chatRoomData: ChatRoomModel = {
            ...data,
            roomID: docRef.id,
            createdAt: now,
            updatedAt: now,
        }
        await docRef.create(chatRoomData)
        return {
            roomID: docRef.id,
        }
    }

    async update(roomID: string, data: Partial<Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID).withConverter(this.converter)
        const chatRoomData: Partial<ChatRoomModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(chatRoomData)
    }

    async inviteEditor(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID).withConverter(this.converter)
        await docRef.update({
            editorList: FieldValue.arrayUnion(uid),
        })
    }

    async invite(roomID: string, uid: string): Promise<void> {
        const chatRoomInfo = await this.getDetail(roomID)
        if (chatRoomInfo === null) throw createAppError(404101)
        if (chatRoomInfo.whiteList === null) throw createAppError(403102)
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID).withConverter(this.converter)
        await docRef.update({
            whiteList: FieldValue.arrayUnion(uid),
        })
    }

    async expal(roomID: string, uid: string): Promise<void> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID).withConverter(this.converter)
        await docRef.update({
            editorList: FieldValue.arrayRemove(uid),
            whiteList: FieldValue.arrayRemove(uid),
            blackList: FieldValue.arrayUnion(uid),
        })
    }

    async getDetail(roomID: string): Promise<ChatRoomModel | null> {
        const docRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).doc(roomID).withConverter(this.converter)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    async getList(): Promise<ChatRoomModel[]> {
        const colRef = this.store.collection(FIRESTORE_COLLECTION_NAME.CHAT_ROOMS).withConverter(this.converter)
        const snapshot = await colRef.get()
        return snapshot.docs.map((v) => v.data())
    }
}
