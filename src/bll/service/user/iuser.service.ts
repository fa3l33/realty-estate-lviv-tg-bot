import { User } from "../../../dal/model/tg/user";

export default interface IUserService {
    getActiveUsers(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
}