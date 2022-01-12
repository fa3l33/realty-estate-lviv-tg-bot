import {
  Context,
  MiddlewareFn,
  MiddlewareObj,
  NextFunction,
} from "grammy";
import Constants from "../tg/constants";
import MarkupManager from "../tg/markup-manager";
import { getUserSession } from "../tg/session-context";

export default class ManagerConnectionMiddleware implements MiddlewareObj {
  middleware: () => MiddlewareFn<Context> = () => {
    return async (ctx: Context, next: NextFunction) => {
      await ctx.answerCallbackQuery();
      let userSession = await getUserSession(ctx);
      const itemData = ctx.callbackQuery!.data!.split(Constants.DELIMITER);
      const itemId = Number(itemData[2]);

      userSession.interestedInItemId = itemId;

      ctx.reply("Оберіть спосіб зворотнього зв'язку:", {
        reply_markup: MarkupManager.getConnectionK(),
      });

      await next();
    };
  };
}
