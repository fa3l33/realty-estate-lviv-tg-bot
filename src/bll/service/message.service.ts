import { SessionContextFlavor } from './../tg/session-context';
import { Bot } from 'grammy';
import { Item } from './../../dal/model/rg_zoo/item';
import logger from '../logger';
import { User } from './../../dal/interfaces/iuser';
import IMessageService from "./imessage.service";
import IItemService from "./item/iitem.service";
import IUserService from "./user/iuser.service";
import { MessageBuilder } from '../tg/message-builder';
import MarkupManager from '../tg/markup-manager';
import config from '../../config';
import TextUtils from '../../common/text-utils';

export default class MessageService implements IMessageService {
    private _userService: IUserService;
    private _itemService: IItemService;
    _bot: Bot<SessionContextFlavor>;

    constructor(bot: Bot<SessionContextFlavor>, userService: IUserService, itemService: IItemService) {
        this._bot = bot;
        this._userService = userService;
        this._itemService = itemService;        
    }
    
      // todo: move to another service
  public postItem(item: Item, chatId: number, userId: number): void {
    this._bot.api.sendMessage(chatId,
      MessageBuilder.buildItemInfo(item), {
        parse_mode: "HTML",
        reply_markup: MarkupManager.getItemIK(userId, item.id),
        disable_web_page_preview: true,
      });
  }

  /**
   * postDetailedItem
   */
  public async postDetailedItem(userId: number, itemId: number) : Promise<void> {
    const user = await this._userService.getById(userId);
    const item = await this._itemService.getById(itemId);

    if (user && item) {
      this._bot.api.sendMessage(user.chatId,
        MessageBuilder.buildItemInfo(item, true), {
          parse_mode: "HTML",
          reply_markup: MarkupManager.getItemIK(userId, item.id),
          disable_web_page_preview: true,
        });
    } else {
      logger.error(`Unable to send detailed item information. Item or User does not exist. ItemId: ${itemId}, UserId: ${userId}`);
    }
  }
}