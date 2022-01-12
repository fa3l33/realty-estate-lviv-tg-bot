import {
    Context,
    MiddlewareFn,
    MiddlewareObj,
    NextFunction,
  } from "grammy";
import Constants from "../tg/constants";
import MarkupManager from "../tg/markup-manager";
import { MessageBuilder } from "../tg/message-builder";
import { getUserSession } from "../tg/session-context";
  
  export default class ConnectionMiddleware implements MiddlewareObj {
    middleware: () => MiddlewareFn<Context> = () => {
      return async (ctx: Context, next: NextFunction) => {
        let userSession = await getUserSession(ctx);
        // skip phone request if already has been shared

        if (ctx.message!.text === Constants.CALL_ME) {
          if (userSession.phoneNumber !== null && userSession.phoneNumber !== '') {
            ctx.reply(MessageBuilder.buildConnectionResponse(true),{
              reply_markup: { remove_keyboard: true },
            });
          } else {
            ctx.reply('Необхідно поділитися номером телефону.', {
                reply_markup: MarkupManager.getPhoneRequest()
            });
          }
        } else if (ctx.message!.text === Constants.MESSAGE_ME) {
          ctx.reply(MessageBuilder.buildConnectionResponse(false), {
            reply_markup: { remove_keyboard: true },
          });
        }

        await next();
      };
    };
  }
  