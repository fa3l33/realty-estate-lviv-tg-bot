import { Bot } from "grammy";
import {
  getUserSession,
  mapFromToSession,
  SessionContextFlavor,
} from "./../session-context";
import MenuComposer from "../menu/menu-composer";
import TextUtils from "../../../common/text-utils";
import config from "../../../config";
import INotificationService from "../../service/inotification.service";

export default class CommandHandler {
    private readonly _notificationService: INotificationService;

    constructor(notificationService: INotificationService) {
        this._notificationService = notificationService;
    }

  public register(bot: Bot<SessionContextFlavor>) {
    var menuComposer = new MenuComposer(this._notificationService);

    bot.api.setMyCommands([
      { command: "start", description: "Початок" },
      { command: "filter", description: "⚙ Налаштування Фільтру" },
      { command: "help", description: "🆘 Допомога" },
      { command: "cancel", description: "❌ Призупинити роботу бота" },
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
      "Робота бота призупинена. Для активації бота скористайтесь командою /filter.",
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }

  private help(ctx: SessionContextFlavor): void {
    ctx.reply(
      `Для отримання додаткової інформації зателефонуйте нам або скористайтесь формою для заявок ${TextUtils.toBold(TextUtils.toLink("Залишити заявку", config.realtyGroup.SITE_URL + '/ostavit_zayavku'))}.\n\n` +
        `${TextUtils.toBold("Наша адреса:")}\n`
        + `м. Херсон, вул. Театральна, 17\n`
        + `тел. ${config.realtyGroup.MANAGER_PHONE}`,
      {
        parse_mode: "HTML",
        disable_web_page_preview: true, 
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    let chatId = Number(ctx.chat?.id);
    ctx.api.sendContact(
      chatId,
      config.realtyGroup.MANAGER_PHONE,
      "Realty Group"
    );
  }

  private async start(ctx: SessionContextFlavor): Promise<void> {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from, ctx.chat);

    ctx.reply(
      TextUtils.toBold(config.telegram.BOT_NAME)
       + " – це бот, компанії " + TextUtils.toLink(TextUtils.toBold('Realty Group'), config.realtyGroup.SITE_URL)
       + ", що допоможе Вам отримувати нові пропозиції щодо нерухомості у місті Херсон.\n\n"
       + " ❗ Для початку роботи скористайтесь командою /filter та завершіть налаштування."
       + " Бот повідомить про актуальні пропозиції за останні пів року та буде надсилати нові актуальні пропозиції щоденно.\n"
       + " ❗ Для припинення роботи боту скористайтесь командою /cancel.\n"
       + " ❗ Для повторної активації боту скористайтесь командою /filter та завершіть налаштування.\n"
       + " ❗ Для отримання додаткової інформації щодо компанії та підтримки скористуйтесь командою /help.",
      {
        parse_mode: "HTML",
        disable_web_page_preview: true,
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
    const userSession = await ctx.session;

    // user may start bot from filter command, if not active - initialize user
    if (!userSession.isActive) {
      mapFromToSession(userSession, ctx.from, ctx.chat);
    }

    menuComposer.sendDefaultMenu(ctx);
  }
}
