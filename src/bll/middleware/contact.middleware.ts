import { Context, MiddlewareFn, MiddlewareObj, NextFunction } from "grammy";
import IMessageService from "../service/imessage.service";
import { MessageBuilder } from "../tg/message-builder";
import { getUserSession } from "../tg/session-context";

export default class ContactMiddleware implements MiddlewareObj {
  private _messageService: IMessageService;

  constructor(messageService: IMessageService) {
    this._messageService = messageService;
  }


  middleware: () => MiddlewareFn<Context> = () => {
    return async (ctx: Context, next: NextFunction) => {        
      let userSession = await getUserSession(ctx);
      userSession.phoneNumber = ctx.message?.contact?.phone_number;

      ctx.reply(MessageBuilder.buildConnectionResponse(true), {
        reply_markup: { remove_keyboard: true },
      });

      this._messageService.notifyInterestedIn(userSession.id, false);

      await next();
    };
  };
}
