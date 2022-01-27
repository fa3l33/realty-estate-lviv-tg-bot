import { SessionContextFlavor } from "./../tg/session-context";
import { Bot } from "grammy";
import { Item } from "./../../dal/model/rg_zoo/item";
import logger from "../logger";
import { User } from "./../../dal/interfaces/iuser";
import IMessageService from "./imessage.service";
import IItemService from "./item/iitem.service";
import IUserService from "./user/iuser.service";
import { MessageBuilder } from "../tg/message-builder";
import MarkupManager from "../tg/markup-manager";
import config from "../../config";
import TextUtils from "../../common/text-utils";

export default class MessageService implements IMessageService {
  private _userService: IUserService;
  private _itemService: IItemService;
  _bot: Bot<SessionContextFlavor>;

  constructor(
    bot: Bot<SessionContextFlavor>,
    userService: IUserService,
    itemService: IItemService
  ) {
    this._bot = bot;
    this._userService = userService;
    this._itemService = itemService;
  }

  public async notifyInterestedIn(
    userId: number,
    isPhoneNotification: boolean = false
  ): Promise<void> {
    const user: User | undefined = await this._userService.getById(userId);

    if (!config.realtyGroup.MANAGER_PHONE) {
        logger.fatal('Manager phone is required. Make sure it is specified in the settings.');
        return;
    }

    const manager: User | undefined = await this._userService.getByPhone(
      config.realtyGroup.MANAGER_PHONE
    );

    if (user && manager && user.interestedInItemId) {
      const lastInterestedItem = await this._itemService.getById(
        user.interestedInItemId
      );
      if (lastInterestedItem) {
        if (isPhoneNotification) {
          if (user.phoneNumber) {
            this._bot.api.sendMessage(
              manager.chatId,
              `Користувач, ${user.firstName} ${
                user.lastName
              }, зацікавився оголошенням: ${
                lastInterestedItem.id
              } - ${TextUtils.toLink(
                lastInterestedItem.name,
                (config.realtyGroup.SITE_URL as string) +
                  "/item/" +
                  lastInterestedItem.id
              )} тa очікує телефонного дзвінку.`,
              {
                parse_mode: "HTML",
                disable_web_page_preview: true,
              }
            );

            this._bot.api.sendContact(
              manager.chatId,
              user.phoneNumber,
              `${user.firstName} ${user.lastName}`
            );
          } else {
            logger.error(
              "User does not have phone number. UserId: %s",
              user.id
            );
          }
        } else {
          if (user.username) {
            this._bot.api.sendMessage(
              manager.chatId,
              `Користувач, ${user.firstName} ${
                user.lastName
              }, зацікавився оголошенням: ${
                lastInterestedItem.id
              } - ${TextUtils.toLink(
                lastInterestedItem.name,
                (config.realtyGroup.SITE_URL as string) +
                  "/item/" +
                  lastInterestedItem.id
              )} та очікує повідомлення у приватний чат. ${TextUtils.toLink(
                user.firstName + " " + user.lastName,
                "https://t.me/" + user.username
              )}`,
              {
                parse_mode: "HTML",
                disable_web_page_preview: true,
              }
            );
          } else {
            logger.error(
              "User does not have username and cannot be linked. UserId: %s",
              user.id
            );
          }
        }
      } else {
        logger.error("Unable to get item by id: %s", user.interestedInItemId);
      }
    } else {
      logger.error(
        "Unable to send interested in notification. User or manager not found. UserId: %s, Manager phone: ",
        userId
      );
    }
  }

  // todo: move to another service
  public postItem(item: Item, chatId: number, userId: number): void {
    this._bot.api.sendMessage(chatId, MessageBuilder.buildItemInfo(item), {
      parse_mode: "HTML",
      reply_markup: MarkupManager.getItemIK(userId, item.id),
      disable_web_page_preview: true,
    });
  }

  /**
   * postDetailedItem
   */
  public async postDetailedItem(userId: number, itemId: number): Promise<void> {
    const user = await this._userService.getById(userId);
    const item = await this._itemService.getById(itemId);

    if (user && item) {
      this._bot.api.sendMessage(
        user.chatId,
        MessageBuilder.buildItemInfo(item, true),
        {
          parse_mode: "HTML",
          reply_markup: MarkupManager.getItemIK(userId, item.id),
          disable_web_page_preview: true,
        }
      );
    } else {
      logger.error(
        `Unable to send detailed item information. Item or User does not exist. ItemId: ${itemId}, UserId: ${userId}`
      );
    }
  }
}
