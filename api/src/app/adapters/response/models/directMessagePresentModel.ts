export interface DirectMessagePresentModel {
    direct_message_doc_id: string
    direct_message_id: number
    sender: string
    receiver: string
    text: string | null
    image: string | null
    created_at: string
    updated_at: string
}
