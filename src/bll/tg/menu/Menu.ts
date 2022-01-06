import { Keyboard } from "grammy";
import { MessageBuilder } from "../message-builder";
import { getUserSession, SessionContextFlavor } from "../session-context";

export default abstract class Menu {
    async sendMenu(ctx: SessionContextFlavor, keyboard: Keyboard) {
        let userSession = await getUserSession(ctx);
      
        ctx.reply(MessageBuilder.buildFilter(userSession), {
          parse_mode: "HTML",
          reply_markup: {
            keyboard: keyboard.build(),
            force_reply: true,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }    
}