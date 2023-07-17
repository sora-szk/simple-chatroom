import Router from 'koa-router';
import * as appHandler from '../handler/v1/appHandler';

export const v1Router = new Router({
    sensitive: true,
    prefix: '/v1',
});

v1Router.get('/ping', appHandler.pingGet)