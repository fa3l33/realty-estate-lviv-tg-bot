import { User } from "../../../dal/model/tg/user";

export default interface IUserService {
    getActiveUsers(): Promise<User[]>;
}