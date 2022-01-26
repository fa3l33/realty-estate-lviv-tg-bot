import { Item } from "../../../dal/model/rg_zoo/item";
import { Range, RecurrenceRule, scheduleJob } from "node-schedule";
import IItemFilterService from '../item/iitem-filter.service';
import ItemFilterService from '../item/item-filter.service';
import INotificationJob from "./inotification.job";
import IUserService from "../user/iuser.service";
import IItemService from "../item/iitem.service";
import ItemService from "../item/item.service";
import * as dayjs from 'dayjs';
import IMessageService from "../imessage.service";
import { filterAsync } from "../../../common/array-utils";
import logger from "../../logger";

export default class NotificationJob implements INotificationJob {
  private _messageService: IMessageService;
  private _itemFilterService: IItemFilterService;
  private _itemService: IItemService;
  private _userService: IUserService;  

  constructor(messageService: IMessageService, userService: IUserService, itemFilterService: ItemFilterService, itemService: ItemService) {
    this._messageService = messageService;
    this._itemFilterService = itemFilterService;
    this._itemService = itemService;
    this._userService = userService;
  }

  start(): void {
    const rule = new RecurrenceRule();
    rule.minute = [0, new Range(0, 59, 1)];

    scheduleJob("user-notification", rule, () =>
      this.notify()
    );
  }

  private async notify() {
    const users = await this._userService.getActiveUsers();
    const items: Array<Item> = await this._itemService.getNotificationItems(dayjs('2021-12-01').subtract(1, 'day').unix());

    users.forEach((user) => {
      filterAsync(items, this._itemFilterService.bySeenItems(user)).then(result => {
        const notifyItems = result.filter(this._itemFilterService.byType)
          .filter(this._itemFilterService.byProperty(user))
          .filter(this._itemFilterService.byRoomsCount(user))
          .filter(this._itemFilterService.byPrice(user))
          .filter(this._itemFilterService.byDistrict(user));
  
        notifyItems.forEach(item => { 
          this._messageService.postItem(item, user.chatId, user.id);
        });

        if (notifyItems.length) {
          this._userService.saveSeenItems(user, notifyItems);
        }
      }).catch(error => logger.error(error, 'Unable to apply filters or save user seen items.'));
    });
  }
}
