import { Context, MiddlewareFn, MiddlewareObj, NextFunction } from "grammy";
import IMessageService from "../service/imessage.service";
import Constants from "../tg/constants";

export default class ItemDetailsMiddleware implements MiddlewareObj{
    _messageService: IMessageService;

    constructor(messageService: IMessageService) {
        this._messageService = messageService;
    }
    middleware: () => MiddlewareFn<Context> = () => {
        return async (ctx: Context, next: NextFunction) => {
            await ctx.answerCallbackQuery();
            const itemData = ctx.callbackQuery!.data!.split(Constants.DELIMITER);
            const userId = Number(itemData[1]);
            const itemId = Number(itemData[2]);
            
            await this._messageService.postDetailedItem(userId, itemId);

            await next();
        }
    };
}
