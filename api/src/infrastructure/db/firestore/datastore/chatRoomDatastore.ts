import * as admin from 'firebase-admin'
import { FieldValue, FirestoreDataConverter } from 'firebase-admin/firestore'
import { ChatRoomModel } from '../../../../app/domain/entities/models/chatRoomModel'
import { APP_ERROR_CODES } from '../../../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../../../errors/factories/appErrorFactory'
import { FIRESTORE_COLLECTION_NAMES } from '../constants/firestoreCollectionNames'

export class ChatRoomDatastore {
    constructor(
        private store: admin.firestore.Firestore,
        private converter: FirestoreDataConverter<ChatRoomModel>
    ) {}

    async create(
        data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>
    ): Promise<{ roomID: string }> {
        const now = new Date()
        const docRef = this._getDocRef()
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

    async update(
        roomID: string,
        data: Partial<Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        const docRef = this._getDocRef(roomID)
        const chatRoomData: Partial<ChatRoomModel> = {
            ...data,
            updatedAt: new Date(),
        }
        await docRef.update(chatRoomData)
    }

    async inviteEditor(roomID: string, data: { uid: string }): Promise<void> {
        const docRef = this._getDocRef(roomID)
        await docRef.update({
            editorList: FieldValue.arrayUnion(data.uid),
        })
    }

    async invite(roomID: string, data: { uid: string }): Promise<void> {
        const chatRoomInfo = await this.getDetail(roomID)
        if (chatRoomInfo === null) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_NOT_FOUND)
        }
        if (chatRoomInfo.whiteList === null) {
            throw appErrorFactory(APP_ERROR_CODES.CHAT_ROOM_WHITELIST_NOT_FOUND)
        }
        const docRef = this._getDocRef(roomID)
        await docRef.update({
            whiteList: FieldValue.arrayUnion(data.uid),
        })
    }

    async expel(roomID: string, data: { uid: string }): Promise<void> {
        const { uid } = data
        const docRef = this._getDocRef(roomID)
        await this.store.runTransaction(async (transaction) => {
            transaction.update(docRef, {
                editorList: admin.firestore.FieldValue.arrayRemove(uid),
                whiteList: admin.firestore.FieldValue.arrayRemove(uid),
                blackList: admin.firestore.FieldValue.arrayUnion(uid),
            })
        })
    }

    async getDetail(roomID: string): Promise<ChatRoomModel | null> {
        const docRef = this._getDocRef(roomID)
        const snapshot = await docRef.get()
        return snapshot.data() ?? null
    }

    async getList(): Promise<ChatRoomModel[]> {
        const colRef = this._getColRef()
        const snapshot = await colRef.get()
        return snapshot.docs.map((v) => v.data())
    }

    private _getColRef() {
        return this.store
            .collection(FIRESTORE_COLLECTION_NAMES.CHAT_ROOMS)
            .withConverter(this.converter)
    }

    private _getDocRef(docID?: string) {
        const colRef = this._getColRef()
        return docID ? colRef.doc(docID) : colRef.doc()
    }
}
