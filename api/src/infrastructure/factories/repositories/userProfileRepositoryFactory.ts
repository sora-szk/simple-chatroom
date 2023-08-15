import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { UserProfileModel } from '../../../app/domain/entities/models/userProfileModel'
import { UserProfileConverter } from '../../../app/adapters/firestore/converters/userProfileConverter'
import { UserProfileRepositoryImpl } from '../../db/repositoriesImpl/userProfileRepositoryImpl'
import { UserProfileRepository } from '../../../app/domain/interfaces/repository/userProfileRepository'
import { UserProfileDatastore } from '../../db/firestore/datastore/userProfileDatastore'

export const userProfileConverterFactory = (): FirestoreDataConverter<UserProfileModel> =>
    new UserProfileConverter()

export const userProfileDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<UserProfileModel>
): UserProfileDatastore => new UserProfileDatastore(store, converter)

export const userProfileRepositoryFactory = (
    datastore: UserProfileDatastore
): UserProfileRepository => new UserProfileRepositoryImpl(datastore)
