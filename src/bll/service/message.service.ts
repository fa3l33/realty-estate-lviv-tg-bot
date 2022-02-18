import { SessionContextFlavor } from "./../tg/session-context";
import { Bot } from "grammy";
import logger from "../logger";
import { User } from "./../../dal/interfaces/iuser";
import IMessageService from "./imessage.service";
import IItemService from "./item/iitem.service";
import IUserService from "./user/iuser.service";
import { MessageBuilder } from "../tg/message-builder";
import MarkupManager from "../tg/markup-manager";
import config from "../../config";
import TextUtils from "../../common/text-utils";
import LigaProItemDTO from "../dto/liga-pro-item.dto";
import { InputMediaPhoto } from "grammy/out/platform.node";

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
      logger.fatal(
        "Manager phone is required. Make sure it is specified in the settings."
      );
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
              }, зацікавився оголошенням: ${lastInterestedItem.getInternalId()} - ${TextUtils.toLink(
                lastInterestedItem.getTitle(),
                (config.realtyGroup.SITE_URL as string) +
                  "/item/" +
                  lastInterestedItem.getInternalId()
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
              }, зацікавився оголошенням: ${lastInterestedItem.getInternalId()} - ${TextUtils.toLink(
                lastInterestedItem.getTitle(),
                (config.realtyGroup.SITE_URL as string) +
                  "/item/" +
                  lastInterestedItem.getInternalId()
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
        "Unable to send interested in notification. User or manager not found. UserId: %s, Manager phone: %",
        userId,
        config.realtyGroup.MANAGER_PHONE
      );
    }
  }

  // todo: move to another service
  public async postItem(
    item: LigaProItemDTO,
    chatId: number,
    userId: number
  ): Promise<void> {
    const photos = this.mapToTGPhotos(item, 4);

    if (photos.length) {
      if (photos.length === 1) {
        this._bot.api.sendPhoto(chatId, photos[0].media).then(() => this.sendMessage(chatId, userId, item));
      } else {
        this._bot.api.sendMediaGroup(chatId, photos).then(() => this.sendMessage(chatId, userId, item));
      }
    } else {
      this.sendMessage(chatId, userId, item);
    }
  }

  /**
   * postDetailedItem
   */
  public async postDetailedItem(userId: number, itemId: number): Promise<void> {
    const user = await this._userService.getById(userId);
    const item = this._itemService.getById(itemId);

    if (user && item) {
      const photos = this.mapToTGPhotos(item, 0);

      if (photos.length) {
        if (photos.length === 1) {
          this._bot.api.sendPhoto(user.chatId, photos[0].media).then(() => this.sendMessage(user.chatId, userId, item, true));
        }

        if (photos.length > 1 && photos.length < 10) {
          this._bot.api.sendMediaGroup(user.chatId, photos).then(() => this.sendMessage(user.chatId, userId, item, true));
        }

        if (photos.length >= 10) {
          this._bot.api.sendMediaGroup(user.chatId, photos.slice(0, 9));
          this._bot.api.sendMediaGroup(user.chatId, photos.slice(9, 16)).then(() => this.sendMessage(user.chatId, userId, item, true));
        }
      } else {
        this.sendMessage(user.chatId, userId, item, true);
      }
    }
  }

  private mapToTGPhotos(
    item: LigaProItemDTO,
    count: number = 0
  ): Array<InputMediaPhoto> {
    return item.getImagesURL(count).map((ph) => {
      return {
        media: ph,
        type: "photo",
      } as InputMediaPhoto;
    });
  }

  private async sendMessage(
    chatId: number,
    userId: number,
    item: LigaProItemDTO,
    detailed: boolean = false
  ) : Promise<void> {
    this._bot.api.sendMessage(
      chatId,
      MessageBuilder.buildItemInfo(item, detailed),
      {
        parse_mode: "HTML",
        reply_markup: MarkupManager.getItemIK(
          userId,
          Number.parseInt(item.getInternalId())
        ),
        disable_web_page_preview: true,
      }
    );
  }
}
