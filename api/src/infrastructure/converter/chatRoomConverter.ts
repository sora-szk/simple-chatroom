import * as admin from 'firebase-admin'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { ChatRoomModel } from '../../domain/model/chatRoomModel'

export const createChatRoomConverter =
    (): FirestoreDataConverter<ChatRoomModel> =>
        new ChatRoomConverter()

class ChatRoomConverter
    implements
        FirestoreDataConverter<ChatRoomModel>
{
    toFirestore(
        modelObject: ChatRoomModel
    ): FirebaseFirestore.DocumentData {
        return {
            ...modelObject,
            createdAt:
                admin.firestore.Timestamp.fromDate(
                    modelObject.createdAt
                ),
            updatedAt:
                admin.firestore.Timestamp.fromDate(
                    modelObject.updatedAt
                ),
        }
    }

    fromFirestore(
        snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): ChatRoomModel {
        const data = snapshot.data()
        return {
            ...data,
            createdAt: (
                data.createdAt as admin.firestore.Timestamp
            ).toDate(),
            updatedAt: (
                data.updatedAt as admin.firestore.Timestamp
            ).toDate(),
        } as ChatRoomModel
    }
}
