import "reflect-metadata";
import config from "./config";
import { Bot, Keyboard, lazySession } from "grammy";
import { getRepository } from "typeorm";
import { initialize, SessionContextFlavor } from "./bll/tg/session-context";
import { User } from "./dal/model/tg/user";
import { TypeOrmAdapter } from "./dal/user-storage-adapter";
import initializeDataBase from "./db-initializer";
import CommandHelper from "./bll/tg/command/command-helper";
import ItemNotificationService from "./bll/service/jobs/item-notification.service";
import ItemFilterService from "./bll/service/item-filter.service";
import IItemNotificationService from "./bll/service/jobs/item-notification.interface";
 
async function bootstrap() {
    // create global MySql connection
    await initializeDataBase();

    const bot = new Bot<SessionContextFlavor>(
      config.telegram.BOT_SECRET_KEY as string
    );

    bot.use(
      lazySession({
        initial: initialize,
        storage: new TypeOrmAdapter({ repository: getRepository(User) }),
      })
    );

    CommandHelper.init(bot);
    const itemNotificationService: IItemNotificationService = new ItemNotificationService(bot, new ItemFilterService());
    itemNotificationService.start();

    bot.on("message:contact", (ctx) => {
      ctx.reply("thx", {
        reply_markup: { remove_keyboard: true },
      });
    });

    bot.on("callback_query:data", (ctx) => {
      ctx.answerCallbackQuery();

      ctx.reply(`Оберіть спосіб для зворотнього зв'язку.`, {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: new Keyboard()
            .requestContact(
              "Зателефонуйте мені\n (поділитися номером телефону)"
            )
            .row()
            .text("Напишіть мені.")
            .build(),
          resize_keyboard: true,
          selective: true,
          input_field_placeholder: `Оберіть спосіб для зворотнього зв'язку.`,
        },
      });
    });

    bot.catch((value) => {
      console.log(value);
    });

    bot.start();
}

bootstrap();

export default bootstrap;
