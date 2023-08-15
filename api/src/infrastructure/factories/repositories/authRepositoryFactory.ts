import { AuthRepository } from '../../../app/domain/interfaces/repository/authRepository'
import { AuthRepositoryImpl } from '../../db/repositoriesImpl/authRepositoryImpl'

export const authRepositoryFactory = (): AuthRepository => AuthRepositoryImpl.getInstance()
