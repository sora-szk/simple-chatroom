import { AppContext } from '../../../infrastructure/api/types/appContext'

export interface CommonHandler {
    /**
     * サーバーが稼働しているかを確認するための応答を返します。
     */
    ping(ctx: AppContext): void
}
