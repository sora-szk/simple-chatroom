import Router from 'koa-router'

export const pingGet: Router.IMiddleware = async (ctx) => {
    ctx.body = ''
    ctx.status = 200
}
