import { Item } from '../../../dal/model/rg_zoo/item';

export default interface IItemService {
    getNotificationItems(filterDateUnix: number): Promise<Item[]>;
    getById(id: number) : Promise<Item | undefined>;
}