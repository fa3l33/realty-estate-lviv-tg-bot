import { Bot } from "grammy";
import {
  getUserSession,
  mapFromToSession,
  SessionContextFlavor,
} from "./../session-context";
import MenuComposer from "../menu/menu-composer";
import TextUtils from "../../../common/text-utils";
import config from "../../../config";

export default class CommandHandler {
  public register(bot: Bot<SessionContextFlavor>) {
    var menuComposer = new MenuComposer();

    bot.api.setMyCommands([
      { command: "start", description: "Початок" },
      { command: "filter", description: "Налаштування Фільтру" },
      { command: "help", description: "Допомога" },
      { command: "cancel", description: "Призупинити роботу бота" },
    ]);

    bot.command("start", this.start);
    bot.command("filter", (ctx) => this.filter(ctx, menuComposer));
    bot.command("help", this.help);
    bot.command("cancel", this.cancel);

    menuComposer.addListener(bot);
  }

  private async cancel(ctx: SessionContextFlavor): Promise<void> {
    let userSession = await getUserSession(ctx);
    userSession.isActive = false;

    ctx.reply(
      "Робота бота призупинена. Для активації бота скористайтесь командою '/filter'.",
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }

  private help(ctx: SessionContextFlavor): void {
    ctx.reply(
      `${TextUtils.toBold(TextUtils.toUnderline("REALTY GROUP"))}\n\n` +
        `${TextUtils.toBold("Адреса")}\n` +
        `м. Херсон, вул. Театральна, 17`,
      {
        parse_mode: "HTML",
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    let chatId = Number(ctx.chat?.id);
    ctx.api.sendContact(
      chatId,
      config.realtyGroup.MANAGER_PHONE as string,
      "Realty Group"
    );
  }

  private async start(ctx: SessionContextFlavor): Promise<void> {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from, ctx.chat);

    ctx.reply(
      "Thanks that you have chosen to use this bot, we will try to make it useful for you. Start working with bot by creating a new filter by using 'filter' command.",
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }

  private async filter(
    ctx: SessionContextFlavor,
    menuComposer: MenuComposer
  ): Promise<void> {
    let userSession = await getUserSession(ctx);
    userSession.isActive = true;
    userSession.lastUpdateTS = new Date(Date.now());

    menuComposer.sendDefaultMenu(ctx);
  }
}
