export interface RoomMessageModel {
    roomMessageDocID: string;
    roomMessageID: number;
    roomID: string;
    sender: string;
    text: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}