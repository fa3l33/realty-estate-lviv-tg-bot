import "reflect-metadata";
import config from "./config";
import { Bot, Context, lazySession } from "grammy";
import { getRepository } from "typeorm";
import { initialize, SessionContextFlavor } from "./bll/tg/session-context";
import { User } from "./dal/model/tg/user";
import { TypeOrmAdapter } from "./dal/user-storage-adapter";
import initializeDataBase from "./db-initializer";
import ItemFilterService from "./bll/service/item/item-filter.service";
import UserService from "./bll/service/user/user.service";
import ItemService from "./bll/service/item/item.service";
import Constants from "./bll/tg/constants";
import ItemDetailsMiddleware from "./bll/middleware/item-details.middleware";
import ManagerConnectionMiddleware from "./bll/middleware/manager-connection.middleware";
import ConnectionMiddleware from "./bll/middleware/connection.middleware";
import ContactMiddleware from "./bll/middleware/contact.middleware";
import MessageService from "./bll/service/message.service";
import ICommandHandler from "./bll/tg/command/icommnad-handler";
import CommandHandler from "./bll/tg/command/command-handler";
import NotificationService from "./bll/service/notification.service";

import ILigaProPortingService from "./bll/service/iligapro-porting.service";
import LigaProPortingService from "./bll/service/ligapro-porting.service";
import INotificationJob from "./bll/jobs/inotification.job";
import NotificationJob from "./bll/jobs/notification.job";
import IItemService from "./bll/service/item/iitem.service";
import IMessageService from "./bll/service/imessage.service";
import { run, sequentialize } from "@grammyjs/runner";
import logger from "./bll/logger";

async function bootstrap() {
    // create global MySql connection
    await initializeDataBase();

    const bot = new Bot<SessionContextFlavor>(
      config.telegram.BOT_SECRET_KEY as string
    );

    const sequentializer = (ctx: Context) => {
      const chat = ctx.chat?.id.toString();
      const user = ctx.from?.id.toString();

      if (chat && user) {
        return `${chat}_${user}`;
      }
      
      logger.error({ message: 'Unable to determine user from the context: %Ctx', error: ctx });
      return undefined;
    };

    bot.use(sequentialize(sequentializer));

    bot.use(
      lazySession({
        initial: initialize,
        storage: new TypeOrmAdapter({ repository: getRepository(User) }),
      })
    );

    // const throttler = apiThrottler();
    // bot.api.config.use(throttler);

    const userService = new UserService();
    const ligaProPortingService: ILigaProPortingService = new LigaProPortingService();
    const itemService: IItemService = new ItemService(ligaProPortingService);
    const messageService: IMessageService = new MessageService(bot, userService, itemService);
    const itemDetailsMiddleware = new ItemDetailsMiddleware(messageService);
    const managerConnectionMiddleware = new ManagerConnectionMiddleware();
    const connectionMiddleware = new ConnectionMiddleware(messageService);
    const contactMiddleware = new ContactMiddleware(messageService);
    const notificationService = new NotificationService( messageService,
      userService,
      new ItemFilterService(userService),
      itemService);

      // get file on start
    ligaProPortingService.import();
    // create notification job class to schedule notifications
    const itemNotificationService: INotificationJob = new NotificationJob(notificationService, ligaProPortingService);
    itemNotificationService.start();

    // register bot commands
    let commandHandler: ICommandHandler = new CommandHandler(notificationService);
    commandHandler.register(bot);

    bot.on("message:contact").use(contactMiddleware);
    bot.on("callback_query:data").filter((ctx) => {
      return new RegExp(Constants.REGEX.ITEM_DETAILS).test(ctx.callbackQuery.data);
    }).use(itemDetailsMiddleware);
    bot.on("callback_query:data").filter((ctx) => {
      return new RegExp(Constants.REGEX.MANAGER_CONNECTION).test(ctx.callbackQuery.data);
    }).use(managerConnectionMiddleware);
    bot.on(":text").filter((ctx) => {
      return new RegExp(Constants.REGEX.CONTACT_BY_PHONE_OR_MESSAGE).test(ctx.message!.text);
    }).use(connectionMiddleware);

    bot.catch((error) => {
      if (config.isProduction) {
        logger.error({
          message: 'Bot Error',
          error: error
        });
      }
    });

    const runner = run(bot);

    // Stopping the bot when Node process
    // is about to be terminated
    const stopRunner = () => runner.isRunning() && runner.stop();

    process.once("SIGINT", stopRunner);
    process.once("SIGTERM", stopRunner);

    if (config.isProduction) {
      process.on("unhandledRejection", error => logger.error({
        message: 'Unhandled Rejection',
        error: error
      }));
      process.on("uncaughtException", error => logger.error({ message: 'Uncaught Rejection', error: error }));
    }
}

bootstrap();

export default bootstrap;
