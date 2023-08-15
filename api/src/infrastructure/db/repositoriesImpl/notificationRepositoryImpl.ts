import { NotificationModel } from '../../../app/domain/entities/models/notificationModel'
import { NotificationRepository } from '../../../app/domain/interfaces/repository/notificationRepository'
import { NotificationDatastore } from '../firestore/datastore/notificationDatastore'

export class NotificationRepositoryImpl implements NotificationRepository {
    constructor(private datastore: NotificationDatastore) {}

    async create(
        data: Omit<NotificationModel, 'notificationID' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.datastore.create(data)
    }

    async get(notificationID: string): Promise<NotificationModel | null> {
        return this.datastore.get(notificationID)
    }

    async getAll(receiver: string): Promise<NotificationModel[]> {
        return this.datastore.getAll(receiver)
    }
}
