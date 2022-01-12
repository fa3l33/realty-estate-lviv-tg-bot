import { Context, MiddlewareFn, MiddlewareObj, NextFunction } from "grammy";
import { MessageBuilder } from "../tg/message-builder";
import { getUserSession } from "../tg/session-context";

export default class ContactMiddleware implements MiddlewareObj {
  middleware: () => MiddlewareFn<Context> = () => {
    return async (ctx: Context, next: NextFunction) => {        
      let userSession = await getUserSession(ctx);
      userSession.phoneNumber = ctx.message?.contact?.phone_number;

      ctx.reply(MessageBuilder.buildConnectionResponse(true), {
        reply_markup: { remove_keyboard: true },
      });

      await next();
    };
  };
}
