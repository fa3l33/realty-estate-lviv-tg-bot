import { filterAsync } from "../../common/array-utils";
import { Item } from "../../dal/model/rg_zoo/item";
import { User } from "../../dal/model/tg/user";
import logger from "../logger";
import IMessageService from "./imessage.service";
import INotificationService from "./inotification.service";
import IItemFilterService from "./item/iitem-filter.service";
import IItemService from "./item/iitem.service";
import IUserService from './user/iuser.service';

export default class NotificationService implements INotificationService {
    private _messageService: IMessageService;
    private _itemFilterService: IItemFilterService;
    private _itemService: IItemService;
    private _userService: IUserService;
  
    constructor(messageService: IMessageService, userService: IUserService, itemFilterService: IItemFilterService, itemService: IItemService) {
      this._messageService = messageService;
      this._itemFilterService = itemFilterService;
      this._itemService = itemService;
      this._userService = userService;
    }

    /**
     * Get all items that were created after startFilterDate and send notification according to users filter
     * @param startFilterDate - date to filter items by date of creation
     */
    public async notifyUsers(startFilterDate: number) : Promise<void> {
        Promise.allSettled([this._userService.getActiveUsers(), this._itemService.getNotificationItems(startFilterDate)]).then(results => {
            const usersPromise = results[0];
            const itemsPromise = results[1];

            if (usersPromise.status === 'fulfilled' && itemsPromise.status === 'fulfilled') {
                const users = usersPromise.value;
                const items = itemsPromise.value;

                users.forEach((user) => {
                        this.notify(user, items);
                });
            } else {
                logger.fatal('Unable to get users or items.');
            }
        });
      }

      /**
      * Get all items that were created after startFilterDate and send notification according to the user filter
      * @param startFilterDate - date to filter items by date of creation
      */
      public async notifyUser(startFilterDate: number, userId: number) : Promise<void> {
        Promise.allSettled([this._userService.getById(userId), this._itemService.getNotificationItems(startFilterDate)]).then(results => {
            const userPromise = results[0];
            const itemsPromise = results[1];

            if (userPromise.status === 'fulfilled' && itemsPromise.status === 'fulfilled') {
                this.notify(userPromise.value, itemsPromise.value)
            } else {
                logger.fatal('Unable to get users or items.');
            }
        });
      }

    private async notify(user: User | undefined, items: Item[]) : Promise<void> {
        if (user && items && items.length) {
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
        } else {
            logger.error('User or Items not defined. User: %user, %items', user, items);
        }
    }
}