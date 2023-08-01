import { NotificationModel } from "../domain/model/notificationModel";
import { NotificationRepository } from "../domain/repository/notificationRepository";
import { createNotificationDatastore } from '../infrastructure/datastore/notificationDatastore';

export interface NotificationUsecase {
    push(data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    getDetail(notificationID: string): Promise<NotificationModel | null>;
    getList(receiverID: string): Promise<NotificationModel[]>;
}

export const createNotificationUsecase = (notificationReposiroty?: NotificationRepository): NotificationUsecase => {
    const repository = notificationReposiroty ?? createNotificationDatastore()
    return new NotificationUsecaseImpl(repository);
}

export class NotificationUsecaseImpl implements NotificationUsecase {
    private notificationRepository: NotificationRepository;

    constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async push(data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.notificationRepository.create(data);
    }

    async getDetail(notificationID: string): Promise<NotificationModel | null> {
        return this.notificationRepository.get(notificationID);
    }

    async getList(receiverID: string): Promise<NotificationModel[]> {
        return this.notificationRepository.getAll(receiverID);
    }
}
