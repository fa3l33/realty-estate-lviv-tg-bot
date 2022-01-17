import "reflect-metadata";
import config from "./config";
import { Bot, lazySession } from "grammy";
import { getRepository } from "typeorm";
import { initialize, SessionContextFlavor } from "./bll/tg/session-context";
import { User } from "./dal/model/tg/user";
import { TypeOrmAdapter } from "./dal/user-storage-adapter";
import initializeDataBase from "./db-initializer";
import CommandHelper from "./bll/tg/command/command-helper";
import NotificationJob from "./bll/service/jobs/notification.job";
import ItemFilterService from "./bll/service/item/item-filter.service";
import INotificationJob from "./bll/service/jobs/inotification.job";
import UserService from "./bll/service/user/user.service";
import ItemService from "./bll/service/item/item.service";
import Constants from "./bll/tg/constants";
import ItemDetailsMiddleware from "./bll/middleware/item-details.middleware";
import ManagerConnectionMiddleware from "./bll/middleware/manager-connection.middleware";
import ConnectionMiddleware from "./bll/middleware/connection.middleware";
import ContactMiddleware from "./bll/middleware/contact.middleware";
import MessageService from "./bll/service/message.service";
 
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
    const userService = new UserService();
    const itemService = new ItemService();
    const messageService = new MessageService(bot, userService, itemService);
    const itemDetailsMiddleware = new ItemDetailsMiddleware(messageService);
    const managerConnectionMiddleware = new ManagerConnectionMiddleware();
    const connectionMiddleware = new ConnectionMiddleware(messageService);
    const contactMiddleware = new ContactMiddleware(messageService);

    const itemNotificationService: INotificationJob = new NotificationJob(
      messageService,
      userService,
      new ItemFilterService(),
      itemService
    );
    itemNotificationService.start();

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

    bot.catch((value) => {
      console.log(value);
    });

    bot.start();
}

bootstrap();

export default bootstrap;
