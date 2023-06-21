export interface DirectMessageModel {
    directMessageDocID: string;
    directMessageID: number;
    sender: string;
    receiver: string;
    text: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}