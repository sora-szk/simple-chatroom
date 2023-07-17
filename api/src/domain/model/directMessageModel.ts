export interface DirectMessageModel {
    directMessageDocID: string;
    directMessageID: number;
    sender: string;
    receiver: string;
    text: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}