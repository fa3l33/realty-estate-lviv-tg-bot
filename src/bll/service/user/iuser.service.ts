import { LigaProItem } from './../../dto/liga-pro-item.type';
import { User } from "../../../dal/model/tg/user";

export default interface IUserService {
    getActiveUsers(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
    getByPhone(phoneNumber: string): Promise<User | undefined>;
    getByIdWithSeenItemIds(id: number): Promise<User | undefined>;
    saveSeenItems(user: User, items: LigaProItem[]) : Promise<void>
}