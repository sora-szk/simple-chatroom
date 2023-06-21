import * as admin from 'firebase-admin'
import { PrivateUserProfileModel } from "../domain/model/privateUserProfileModel";
import { PrivateUserProfileRepository } from "../domain/repository/privateUserProfileRepository";
import { PrivateUserProfileDatastore } from '../infrastructure/datastore/privateUserProfileDatastore';

export interface PrivateUserProfileUsecase {
    create(uid: string, data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void>;
    update(uid: string, data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void>;
    get(uid: string): Promise<PrivateUserProfileModel | null>;
}

export const createPrivateUserProfileUsecase = (privateUserProfileRepository?: PrivateUserProfileRepository): PrivateUserProfileUsecase => {
    const repository = privateUserProfileRepository || new PrivateUserProfileDatastore(admin.app().firestore());
    return new PrivateUserProfileUsecaseImpl(repository);
}

export class PrivateUserProfileUsecaseImpl implements PrivateUserProfileUsecase {
    private privateUserProfileRepository: PrivateUserProfileRepository;
    constructor(privateUserProfileRepository: PrivateUserProfileRepository) {
        this.privateUserProfileRepository = privateUserProfileRepository;
    }

    async create(uid: string, data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.privateUserProfileRepository.create(uid, data);
    }

    async update(uid: string, data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        await this.privateUserProfileRepository.update(uid, data);
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        return this.privateUserProfileRepository.get(uid);
    }
}