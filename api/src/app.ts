import admin from 'firebase-admin';
import Koa from 'koa';
import config from 'config';
const cors = require('@koa/cors');
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './gateway/middleware/errorHandler';

import { v1AppRouter } from './gateway/router/v1/appRouter';
import { v1AdminRouter } from './gateway/router/v1/adminRouter';
import { apiKeyValidator } from './gateway/middleware/apiKeyValidator';

const allowEnvironments = ['dev', 'prd']
const env = process.env.NODE_ENV ?? 'dev'
console.log(process.env.NODE_ENV)
if (!allowEnvironments.includes(env)) throw Error(`specified environment '${env}' is not available. `)

const serviceAccount = require(`../credential/${env}/serviceAccountKey.json`);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.get<string>('database.url')
});

export const app = new Koa();

app.use(cors())
app.use(
    bodyParser({
        jsonLimit: '10mb',
        textLimit: '10mb',
        formLimit: '10mb',
    })
);
app.use(errorHandler);
app.use(apiKeyValidator);

app.use(v1AppRouter.routes());
app.use(v1AdminRouter.routes());
