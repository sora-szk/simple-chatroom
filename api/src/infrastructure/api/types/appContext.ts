import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import Koa from 'koa'

export interface AppState {
    uid: string
    idToken: DecodedIdToken
}

export interface AppContext extends Koa.Context {
    state: AppState
}
