import { Repository, getRepository } from 'typeorm';
import { Item } from '../../../dal/model/rg_zoo/item';
import { SessionContextFlavor } from '../../tg/session-context';
import { Bot } from 'grammy';
import IItemService from "./iitem.service";
import { MessageBuilder } from '../../tg/message-builder';
import IUserService from '../user/iuser.service';
import logger from '../../logger';
import MarkupManager from '../../tg/markup-manager';

export default class ItemService implements IItemService {
  _bot: Bot<SessionContextFlavor>;
  _itemRepository: Repository<Item>;
  _userService: IUserService;

  constructor(bot: Bot<SessionContextFlavor>, userService: IUserService) {
    this._bot = bot;
    this._itemRepository = getRepository(Item);
    this._userService = userService;
  }

  public async getById(id: number) : Promise<Item | undefined> {
    return this._itemRepository.findOne(id, {
      relations: ["categories"]
    });
  }

  /**
   * getNotificationItems
   */
  public getNotificationItems(filterDateUnix: number): Promise<Item[]> {
    // todo: move to repository
    return this._itemRepository
      .createQueryBuilder("item")
      .innerJoinAndSelect("item.categories", "categories")
      .where(
        "item.type = :filterType AND UNIX_TIMESTAMP(item.created) > :filterDate" +
          " AND (SELECT rg_zoo_category_item.item_id FROM rg_zoo_category_item as rg_zoo_category_item WHERE rg_zoo_category_item.category_id = :filterCategoryId AND rg_zoo_category_item.item_id = item.id) IS NOT NULL",
        {
          filterDate: filterDateUnix,
          filterType: "realtyobject",
          filterCategoryId: 24,
        }
      )
      .getMany();
  }

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
    const item = await this.getById(itemId);

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