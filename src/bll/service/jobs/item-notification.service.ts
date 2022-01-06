import { getRepository, Repository } from "typeorm";
import { SessionContextFlavor } from "../../tg/session-context";
import { Bot, InlineKeyboard } from "grammy";
import { User } from "../../../dal/model/tg/user";
import { Item } from "../../../dal/model/rg_zoo/item";
import { Job, Range, RecurrenceRule, scheduleJob } from "node-schedule";
import { MessageBuilder } from '../../tg/message-builder';
import IItemFilter from '../item-filter.interface';
import ItemFilterService from '../item-filter.service';
import IItemNotificationService from "./item-notification.interface";

export default class ItemNotificationService implements IItemNotificationService {
  _bot: Bot<SessionContextFlavor>;
  _userRepository: Repository<User>;
  _itemRepository: Repository<Item>;
  _notificationJob!: Job;
  _itemFilterService: IItemFilter

  constructor(bot: Bot<SessionContextFlavor>, itemFilterService: ItemFilterService) {
    this._bot = bot;
    this._userRepository = getRepository(User);
    this._itemRepository = getRepository(Item);
    this._itemFilterService = itemFilterService;
  }

  start(): void {
    const rule = new RecurrenceRule();
    rule.minute = [0, new Range(0, 59, 1)];

    this._notificationJob = scheduleJob("user-notification", rule, () =>
      this.notify()
    );
  }

  private async notify() {
    const users = await this._userRepository.find({
      isActive: true,
    });

    const items: Array<Item> = await this._itemRepository
      .createQueryBuilder("item")
      .innerJoinAndSelect("item.categories", "categories")
      .where(
        "item.type = :filterType AND item.created > :filterDate" +
          " AND (SELECT rg_zoo_category_item.item_id FROM rg_zoo_category_item as rg_zoo_category_item WHERE rg_zoo_category_item.category_id = :filterCategoryId AND rg_zoo_category_item.item_id = item.id) IS NOT NULL",
        {
          filterDate: "2021-12-01",
          filterType: "realtyobject",
          filterCategoryId: 24,
        }
      )
      .getMany();

    users.forEach((user) => {
      const notifyItems = items
        .filter(this._itemFilterService.byProperty(user))
        .filter(this._itemFilterService.byRoomsCount(user))
        .filter(this._itemFilterService.byPrice(user))
        .filter(this._itemFilterService.byDistrict(user));

      console.log(notifyItems);

      notifyItems.forEach(item => { 
        this._bot.api.sendMessage(user.chatId,
          MessageBuilder.buildItemInfo(item), {
            parse_mode: "HTML",
            reply_markup: new InlineKeyboard().text(
              "Дізнатись більше у менеджера",
              `${user.id}-${item.id}`
            ),
            disable_web_page_preview: true,
          });
      });
    });
  }
}
