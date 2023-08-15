import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { PrivateUserProfileModel } from '../../../app/domain/entities/models/privateUserProfileModel'
import { PrivateUserProfileConverter } from '../../../app/adapters/firestore/converters/privateUserProfileConverter'
import { PrivateUserProfileRepositoryImpl } from '../../db/repositoriesImpl/privateUserProfileRepositoryImpl'
import { PrivateUserProfileRepository } from '../../../app/domain/interfaces/repository/privateUserProfileRepository'
import { PrivateUserProfileDatastore } from '../../db/firestore/datastore/privateUserProfileDatastore'

export const privateUserProfileConverterFactory =
    (): FirestoreDataConverter<PrivateUserProfileModel> => new PrivateUserProfileConverter()

export const privateUserProfileDatastoreFactory = (
    store: FirebaseFirestore.Firestore,
    converter: FirestoreDataConverter<PrivateUserProfileModel>
): PrivateUserProfileDatastore => new PrivateUserProfileDatastore(store, converter)

export const privateUserProfileRepositoryFactory = (
    datastore: PrivateUserProfileDatastore
): PrivateUserProfileRepository => new PrivateUserProfileRepositoryImpl(datastore)
