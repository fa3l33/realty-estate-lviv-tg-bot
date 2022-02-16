import { User } from '../../../dal/model/tg/user';
import LigaProItemDTO from '../../dto/liga-pro-item.dto';

export default interface IItemFilterService {
    byType(item: LigaProItemDTO) : boolean;
    byProperty(user: User) : (item: LigaProItemDTO) => boolean;
    byRoomsCount(user: User) : (item: LigaProItemDTO) => boolean;
    byPrice(user: User) : (item: LigaProItemDTO) => boolean;
    byDistrict(user: User) : (item: LigaProItemDTO) => boolean;
    bySeenItems(user: User): (item: LigaProItemDTO) => Promise<boolean>;
}