import { Item } from '../../../dal/model/rg_zoo/item';

export default interface IItemService {
    getNotificationItems(filterDateUnix: number): Promise<Item[]>;
    postItem(item: Item, chatId: number, userId: number): void;
}