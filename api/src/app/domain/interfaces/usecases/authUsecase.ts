import { UserRecord } from 'firebase-admin/lib/auth/user-record'

export interface AuthUsecase {
    /**
     * - 新規ユーザアカウント・プロファイル仮作成、認証メール発行を行う
     * - メール認証が成功したら、アカウント作成は完了となる
     */
    signup(data: { email: string; password: string }): Promise<void>
    getUser(uid: string): Promise<UserRecord | null>
}
