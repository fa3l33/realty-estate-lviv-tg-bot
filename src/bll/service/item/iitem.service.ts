import LigaProItemDTO from '../../dto/liga-pro-item.dto';

export default interface IItemService {
    getNotificationItems(filterDateUnix: number): LigaProItemDTO[]
    getById(id: number) : LigaProItemDTO | undefined;
}