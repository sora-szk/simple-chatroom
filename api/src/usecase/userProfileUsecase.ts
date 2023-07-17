import { UserProfileModel } from "../domain/model/userProfileModel";
import { UserProfileRepository } from "../domain/repository/userProfileRepository";
import { createUserProfileDatastore } from "../infrastructure/datastore/userProfileDatastore";

export interface UserProfileUsecase {
    create(uid: string, data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void>;
    update(uid: string, data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void>;
    get(uid: string): Promise<UserProfileModel | null>;
}

export const createUserProfileUsecase = (userProfileRepository?: UserProfileRepository): UserProfileUsecase => {
    const repository = userProfileRepository ?? createUserProfileDatastore();
    return new UserProfileUsecaseImpl(repository);
};

export class UserProfileUsecaseImpl implements UserProfileUsecase {
    private userProfileRepository: UserProfileRepository;
    constructor(userProfileRepository: UserProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    async create(uid: string, data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> {
        await this.userProfileRepository.create(uid, data);
    }

    async update(uid: string, data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void> {
        await this.userProfileRepository.update(uid, data);
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        return this.userProfileRepository.get(uid);
    }
}
