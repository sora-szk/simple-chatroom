import Koa from 'koa';
import { UserProfileUsecase, createUserProfileUsecase } from "../../../../usecase/userProfileUsecase";
import * as userProfileRequestSchema from '../../../request/schema/userProfileRequestSchema';
import { createAppError } from '../../../../domain/appError';

export const createHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const uid = ctx.params.uid
    const body = ctx.request.body as any;
    const { error } = userProfileRequestSchema.createSchema.validate(body);
    if (error) {
        if (error.details.some(detail => detail.type === 'any.required')) {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`);
        } else {
            const details = error.details.map(detail => detail.message).join(', ');
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`);
        }
    }
    
    const userProfileUsecase: UserProfileUsecase = createUserProfileUsecase();
    await userProfileUsecase.create(uid, body);
    ctx.body = '';
    ctx.status = 201;
}