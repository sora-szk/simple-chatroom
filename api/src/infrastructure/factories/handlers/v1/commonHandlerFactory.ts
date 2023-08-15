import { CommonHandler } from '../../../../app/adapters/handlers/commonHandler'
import { CommonHandlerImpl } from '../../../api/handlers/v1/commonHandlerImpl'

export const commonHandlerFactory = (): CommonHandler => new CommonHandlerImpl()
