import { Context, MiddlewareFn, MiddlewareObj, NextFunction } from "grammy";
import ItemService from "../service/item/item.service";
import Constants from "../tg/constants";

export default class ItemDetailsMiddleware implements MiddlewareObj{
    _itemService: ItemService;

    constructor(itemService: ItemService) {
        this._itemService = itemService;
    }
    middleware: () => MiddlewareFn<Context> = () => {
        return async (ctx: Context, next: NextFunction) => {
            await ctx.answerCallbackQuery();
            const itemData = ctx.callbackQuery!.data!.split(Constants.DELIMITER);
            const userId = Number(itemData[1]);
            const itemId = Number(itemData[2]);
            
            await this._itemService.postDetailedItem(userId, itemId);

            await next();
        }
    };
}
