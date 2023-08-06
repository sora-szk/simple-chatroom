import { DirectMessageModel } from '../../domain/model/directMessageModel'

export const detail = (source: DirectMessageModel) => {
    return {
        direct_message_doc_id: source.directMessageDocID,
        direct_message_id: source.directMessageID,
        sender: source.sender,
        receiver: source.receiver,
        text: source.text,
        image: source.image,
        created_at: source.createdAt.toISOString(),
        updated_at: source.updatedAt.toISOString(),
    }
}

export const detailList = (source: DirectMessageModel[]) => {
    return source.map(detail)
}
