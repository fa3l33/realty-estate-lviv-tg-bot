import { Item } from "../../../dal/model/rg_zoo/item";
import { User } from "../../../dal/model/tg/user";

export default interface IUserService {
    getActiveUsers(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
    getByPhone(phoneNumber: string): Promise<User | undefined>;
    getSeenItemsIdById(id: number): Promise<User | undefined>;
    saveSeenItems(user: User, items: Item[]) : Promise<void>
}