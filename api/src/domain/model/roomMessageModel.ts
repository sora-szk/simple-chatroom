export interface RoomMessageModel {
    roomMessageDocID: string;
    roomMessageID: number;
    roomID: string;
    sender: string;
    text: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}