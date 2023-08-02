import Koa from 'koa';
import { createAppError } from '../../../../domain/appError';
import { RoomMessageUsecase, createRoomMessageUsecase } from '../../../../usecase/roomMessageUsecase';
import * as roomMessageRequestSchema from '../../../request/schema/roomMessageRequestSchema'
import * as roomMessagePresenter from '../../../presenter/roomMessagePresenter'

export const sendHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any;
    const { error } = roomMessageRequestSchema.sendSchema.validate(body);
    if (error) {
        if (error.details.some(detail => detail.type === 'any.required')) {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`);
        } else {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`);
        }
    }

    const mappedData = {
        roomID: body.room_id,
        sender: ctx.state.uid,
        text: body.text,
        image: body.image,
    };
    const roomMessageUsecase: RoomMessageUsecase = createRoomMessageUsecase();
    await roomMessageUsecase.send(mappedData);
    ctx.body = '';
    ctx.status = 201;
}

export const getListHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const { room_id } = ctx.params;
    const { error } = roomMessageRequestSchema.getListSchema.validate({ room_id });
    if (error) {
        if (error.details.some(detail => detail.type === 'any.required')) {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`);
        } else {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`);
        }
    }

    const roomMessageUsecase: RoomMessageUsecase = createRoomMessageUsecase();
    const result = await roomMessageUsecase.getList(room_id, ctx.state.uid);
    ctx.body = {
        room_messages: roomMessagePresenter.detailList(result),
    };
    ctx.state = 200;
}

export const getHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const { room_id } = ctx.params;
    const { room_message_id } = ctx.query as any;
    const { error } = roomMessageRequestSchema.getDetailSchema.validate({ 
        room_id,
        room_message_id, 
    });
    if (error) {
        if (error.details.some(detail => detail.type === 'any.required')) {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`);
        } else {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`);
        }
    }

    const roomMessageUsecase: RoomMessageUsecase = createRoomMessageUsecase();
    const result = await roomMessageUsecase.get(ctx.state.uid, room_message_id);
    ctx.body = {
        room_message: result ? roomMessagePresenter.detail(result) : null,
    };
    ctx.state = 200;
}
