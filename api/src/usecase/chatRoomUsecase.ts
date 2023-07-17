import { createAppError } from "../domain/appError";
import { ChatRoomModel } from "../domain/model/chatRoomModel";
import { ChatRoomRepository } from "../domain/repository/chatRoomRepository";
import { createChatRoomDatastore } from '../infrastructure/datastore/chatRoomDatastore';

export interface ChatRoomUsecase {
    create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    /**
     * roomのorganizerがeditorを招待する
     * @param roomID 
     * @param senderUID 
     * @param uid 
     */
    inviteEditor(roomID: string, senderUID: string, uid: string): Promise<void>;
    invite(roomID: string, senderUID: string, uid: string): Promise<void>;
    expal(roomID: string, senderUID: string, uid: string): Promise<void>;
    getDetail(roomID: string, uid: string): Promise<ChatRoomModel | null>;
    getList(uid: string): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]>;
}

export const createChatRoomUsecase = (chatRoomRepository?: ChatRoomRepository): ChatRoomUsecase => {
    const repository = chatRoomRepository ?? createChatRoomDatastore()
    return new ChatRoomUsecaseImpl(repository);
}

export class ChatRoomUsecaseImpl implements ChatRoomUsecase {
    private chatRoomRepository: ChatRoomRepository;

    constructor(chatRoomRepository: ChatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    async create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.chatRoomRepository.create(data);
    }

    async inviteEditor(roomID: string, senderUID: string, uid: string): Promise<void> {
        const chatRoomInfo = await this.chatRoomRepository.getDetail(roomID);
        if(chatRoomInfo === null) throw createAppError(404101);
        if(chatRoomInfo.organizer !== senderUID) throw createAppError(403101);
        await this.chatRoomRepository.inviteEditor(roomID, uid);
    }

    async invite(roomID: string, senderUID: string, uid: string): Promise<void> {
        const chatRoomInfo = await this.chatRoomRepository.getDetail(roomID);
        if(chatRoomInfo === null) throw createAppError(404101);
        if(!chatRoomInfo.editorList.includes(senderUID)) throw createAppError(403101);
        await this.chatRoomRepository.invite(roomID, uid);
    }

    async expal(roomID: string, senderUID: string, uid: string): Promise<void> {
        const chatRoomInfo = await this.chatRoomRepository.getDetail(roomID);
        if(chatRoomInfo === null) throw createAppError(404101);
        if(!chatRoomInfo.editorList.includes(senderUID)) throw createAppError(403101);
        await this.chatRoomRepository.expal(roomID, uid);
    }

    /**
     * 
     * @param roomID 
     * @param uid 取得ユーザのid
     * @returns 取得ユーザがorganizor、editorList、whiteListのどれかに含まれており、blackListに含まれていない場合、対象room情報を返却
     */
    async getDetail(roomID: string, uid: string): Promise<ChatRoomModel | null> {
        const room = await this.chatRoomRepository.getDetail(roomID);
        if(room === null) return null;
        if(room.blackList.includes(uid)) return null;
        if(room.organizer === uid) return room;
        if(room.editorList.includes(uid)) return room;
        if(room.whiteList?.includes(uid) ?? true) return room;
        return null;
    }

    /**
     * 
     * @param uid 取得ユーザのid
     * @returns 取得ユーザがorganizor、editorList、whiteListのどれかに含まれており、blackListに含まれていないroom情報を返却
     */
    async getList(uid: string): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]> {
        const rawList = await this.chatRoomRepository.getList();
        const respList = rawList
            .filter(
                room => room.organizer === uid || 
                room.editorList.includes(uid) || 
                (room.whiteList?.includes(uid) ?? true)
            )
            .filter(room => !room.blackList.includes(uid));
        return respList;
    }
}
