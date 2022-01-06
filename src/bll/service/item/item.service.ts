import { Repository, getRepository } from 'typeorm';
import { Item } from '../../../dal/model/rg_zoo/item';
import { SessionContextFlavor } from '../../tg/session-context';
import { Bot, InlineKeyboard } from 'grammy';
import IItemService from "./iitem.service";
import { MessageBuilder } from '../../tg/message-builder';

export default class ItemService implements IItemService {
  _bot: Bot<SessionContextFlavor>;
  _itemRepository: Repository<Item>;

  constructor(bot: Bot<SessionContextFlavor>) {
    this._bot = bot;
    this._itemRepository = getRepository(Item);
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
        reply_markup: new InlineKeyboard().text(
          "Дізнатись більше у менеджера",
          `${userId}-${item.id}`
        ),
        disable_web_page_preview: true,
      });
  }
}