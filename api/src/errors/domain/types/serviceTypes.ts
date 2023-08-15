import { SERVICE_CODES } from '../../constants/serviceCodes'

export type ServiceType = (typeof SERVICE_CODES)[keyof typeof SERVICE_CODES]
