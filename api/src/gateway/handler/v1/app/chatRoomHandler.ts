import Koa from 'koa';
import { ChatRoomUsecase, createChatRoomUsecase } from '../../../../usecase/chatRoomUsecase';
import { createAppError } from '../../../../domain/appError';
import * as chatRoomRequestSchema from '../../../request/schema/chatRoomRequestSchema';
import * as chatRoomPresenter from '../../../presenter/chatRoomPresenter';

export const createHandler = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any;
    const { error } = chatRoomRequestSchema.createChatRoomSchema.validate(body);
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
        name: body.name,
        organizer: ctx.state.uid,
        editorList: body.editor_list,
        whiteList: body.white_list ?? null,  
        blackList: body.black_list,
    };
    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    const resp = await chatRoomUsecase.create(mappedData);
    ctx.body = chatRoomPresenter.createResult(resp);
    ctx.status = 201;
};

export const inviteHandler = async (ctx: Koa.Context) => {
    const room_id = ctx.params.room_id
    const body = ctx.request.body as any;
    const { error } = chatRoomRequestSchema.inviteSchema.validate({
        room_id,
        ...body,
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

    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    await chatRoomUsecase.invite(ctx.params.room_id, ctx.state.uid, body.invite_user_id);
    ctx.body = '';
    ctx.status = 204;
};

export const inviteEditorHandler = async (ctx: Koa.Context) => {
    const room_id = ctx.params.room_id
    const body = ctx.request.body as any;
    const { error } = chatRoomRequestSchema.inviteSchema.validate({
        room_id,
        ...body,
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

    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    await chatRoomUsecase.inviteEditor(room_id, ctx.state.uid, body.invite_user_id);
    ctx.body = '';
    ctx.status = 204;
};

export const expalHandler = async (ctx: Koa.Context) => {
    const room_id = ctx.params.room_id
    const body = ctx.request.body as any;
    const { error } = chatRoomRequestSchema.expalSchema.validate({
        room_id,
        ...body,
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

    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    await chatRoomUsecase.expal(ctx.params.room_id, ctx.state.uid, body.expal_user_id);
    ctx.body = '';
    ctx.status = 204;
};

export const getListHandler = async (ctx: Koa.Context) => {
    const room_id = ctx.params.room_id
    const { error } = chatRoomRequestSchema.getListSchema.validate({
        room_id,
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

    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    const resp = await chatRoomUsecase.getList(room_id);
    ctx.body = {
        chat_rooms: chatRoomPresenter.summaryList(resp),
    };
    ctx.status = 200;
};

export const getDetailHandler = async (ctx: Koa.Context) => {
    const room_id = ctx.params.room_id
    const { error } = chatRoomRequestSchema.getDetailSchema.validate({
        room_id,
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
    
    const chatRoomUsecase: ChatRoomUsecase = createChatRoomUsecase();
    const resp = await chatRoomUsecase.getDetail(room_id, ctx.state.uid);
    ctx.body = {
        chat_room: resp ? chatRoomPresenter.detail(resp) : null
    };
    ctx.status = 200;
};
