import { getRepository, Repository } from "typeorm";
import { Item } from "../../../dal/model/rg_zoo/item";
import { User } from "../../../dal/model/tg/user";
import logger from "../../logger";
import IUserService from "./iuser.service";

export default class UserService implements IUserService {
  private _userRepository: Repository<User>;

  constructor() {
    this._userRepository = getRepository(User);
  }

  public async getById(id: number): Promise<User | undefined> {
    return this._userRepository.findOne(id);
  }

  public async getByPhone(phoneNumber: string): Promise<User | undefined> {
    return this._userRepository.findOne({ phoneNumber: phoneNumber });
  }

  public async getSeenItemsIdById(id: number): Promise<User | undefined> {
    return this._userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.items', 'item')
    .select([
      'user.id',
      'item.id'
    ])
    .where("user.id = :id", { id: id })
    .getOne();
  }

  /**
   * getActiveUsers
   */
  public async getActiveUsers(): Promise<User[]> {
    return this._userRepository.find({
      isActive: true,
    });
  }

  public async saveSeenItems(user: User, items: Item[]) : Promise<void> {
    if (user && items && items.length) {
      var rows = items.map(it => {
        return { user_id: user.id, item_id: it.id };
      });

      this._userRepository
        .createQueryBuilder('user_items')
        .insert()
        .into('tg_user_items_seen')
        .values(rows)
        .printSql()
        .execute();
    } else {
      logger.error('Unable to find user by UserId: %UserId', user.id);
    }
  }
}
