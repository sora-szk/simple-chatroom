/* eslint-disable @typescript-eslint/no-var-requires */
import admin from 'firebase-admin'
import config from 'config'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
const cors = require('@koa/cors')
import { apiKeyValidator } from './infrastructure/middlewares/apiKeyValidator'
import { errorHandler } from './infrastructure/middlewares/errorHandler'

const allowEnvironments = ['dev', 'prd']
const env = process.env.NODE_ENV ?? 'dev'
if (!allowEnvironments.includes(env)) {
    throw Error(`specified environment '${env}' is not available. `)
}

const serviceAccount = require(`../credential/${env}/serviceAccountKey.json`)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.get<string>('database.url'),
})

export const app = new Koa()

app.use(cors())
app.use(
    bodyParser({
        jsonLimit: '10mb',
        textLimit: '10mb',
        formLimit: '10mb',
    })
)
app.use(errorHandler)
app.use(apiKeyValidator)

const v1AdminRouter = require('./infrastructure/api/routers/v1/adminRouter').v1AdminRouter
const v1AppRouter = require('./infrastructure/api/routers/v1/appRouter').v1AppRouter

app.use(v1AppRouter.routes())
app.use(v1AdminRouter.routes())
