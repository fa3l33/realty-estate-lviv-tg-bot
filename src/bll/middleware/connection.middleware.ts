import { Context, MiddlewareFn, MiddlewareObj, NextFunction } from "grammy";
import logger from "../logger";
import IMessageService from "../service/imessage.service";
import Constants from "../tg/constants";
import MarkupManager from "../tg/markup-manager";
import { MessageBuilder } from "../tg/message-builder";
import { getUserSession } from "../tg/session-context";

export default class ConnectionMiddleware implements MiddlewareObj {
  private _messageService: IMessageService;

  constructor(messageService: IMessageService) {
    this._messageService = messageService;
  }

  middleware: () => MiddlewareFn<Context> = () => {
    return async (ctx: Context, next: NextFunction) => {
      let userSession = await getUserSession(ctx);
      
      // skip phone request if already has been shared
      if (ctx.message!.text === Constants.CALL_ME) {
        if (
          userSession.phoneNumber !== null &&
          userSession.phoneNumber !== ""
        ) {
          ctx.reply(MessageBuilder.buildConnectionResponse(true), {
            reply_markup: { remove_keyboard: true },
          });

          this._messageService.notifyInterestedIn(userSession.id, true);
        } else {
          ctx.reply("Необхідно поділитися номером телефону.", {
            reply_markup: MarkupManager.getPhoneRequest(),
          });
        }
      } else if (ctx.message!.text === Constants.MESSAGE_ME) {
        if (userSession.username) {
          ctx.reply(MessageBuilder.buildConnectionResponse(false), {
            reply_markup: { remove_keyboard: true },
          });

          this._messageService.notifyInterestedIn(userSession.id, false);
        } else {
          ctx.reply("Для можливості менеджеру надсилати Вам повідомлення ваш особливий облік в Telegram повинен мати username. Створіть username та спробуйте ще раз.", {
            reply_markup: { remove_keyboard: true },
          });  

          logger.error(
            `User does not have username. UserId: %s`, userSession.id
          );
        }
      } else {
        ctx.reply("Команда не підтримується.", {
          reply_markup: { remove_keyboard: true },
        });
        logger.error(
          `Unsupported "${ctx.message?.text}" handled by ConnectionMiddleware.`
        );
      }

      await next();
    };
  };
}
