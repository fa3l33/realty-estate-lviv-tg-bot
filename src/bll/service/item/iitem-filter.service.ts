import { User } from '../../../dal/model/tg/user';
import { Item } from '../../../dal/model/rg_zoo/item';

export default interface IItemFilterService {
    byType(item: Item) : boolean;
    byProperty(user: User) : (item: Item) => boolean;
    byRoomsCount(user: User) : (item: Item) => boolean;
    byPrice(user: User) : (item: Item) => boolean;
    byDistrict(user: User) : (item: Item) => boolean;
    bySeenItems(user: User): (item: Item) => Promise<boolean>;
}