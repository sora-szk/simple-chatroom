import admin from 'firebase-admin';
import Koa from 'koa';
const cors = require('@koa/cors');
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './gateway/middleware/errorHandler';
import { v1Router } from './gateway/router/v1Router';
import { config } from './config';

const allowEnvironments = ['dev', 'prd']
const env = process.env.NODE_ENV ?? 'dev'
if (!allowEnvironments.includes(env)) throw Error(`specified environment '${env}' is not available. `)

const serviceAccount = require(`../credential/${env}/serviceAccountKey.json`);
const matchedConfig = config[env];
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: matchedConfig.database.url,
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
app.use(v1Router.routes());
