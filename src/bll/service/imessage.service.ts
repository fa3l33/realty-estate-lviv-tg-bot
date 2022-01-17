import { Item } from './../../dal/model/rg_zoo/item';

export default interface IMessageService {
    postItem(item: Item, chatId: number, userId: number): void;
    postDetailedItem( userId: number, itemId: number) : Promise<void>;
}