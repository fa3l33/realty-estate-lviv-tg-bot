import { LigaProItem } from './../dto/liga-pro-item.type';

export default interface IMessageService {
    notifyInterestedIn(userId: number, isPhoneNotification: boolean): Promise<void>;
    postItem(item: LigaProItem, chatId: number, userId: number): Promise<void>;
    postDetailedItem( userId: number, itemId: number) : Promise<void>;
}