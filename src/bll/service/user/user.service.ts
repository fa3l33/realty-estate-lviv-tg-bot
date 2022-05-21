import { getRepository, Like, Repository } from "typeorm";
import { User } from "../../../dal/model/tg/user";
import logger from "../../logger";
import IUserService from "./iuser.service";
import LigaProItemDTO from '../../dto/liga-pro-item.dto';

export default class UserService implements IUserService {
  private _userRepository: Repository<User>;

  constructor() {
    this._userRepository = getRepository(User);
  }

  public async getById(id: number): Promise<User | undefined> {
    return this._userRepository.findOne(id);
  }

  public async getByPhone(phoneNumber: string): Promise<User | undefined> {
    return this._userRepository.findOne({
      phoneNumber: Like(`%${phoneNumber}%`),
    });
  }

  public async getByIdWithSeenItemIds(id: number): Promise<User | undefined> {
    return Promise.allSettled([
      this._userRepository.findOne(id),
      this._userRepository.query(
        `SELECT item_id FROM tg_user_items_seen WHERE user_id = ${id};`
      ),
    ]).then((results) => {
      const userPromise = results[0];
      const itemsIdsPromise = results[1];

      if (
        userPromise.status === "fulfilled" &&
        itemsIdsPromise.status === "fulfilled"
      ) {
        const user = userPromise.value;

        if (user) {
          itemsIdsPromise.value.forEach((row: any) => {
            user.itemIds.push(row["item_id"]);
          });
        }

        return user;
      } else {
        logger.crit( {message: "Unable to get users or items." });
      }

      return undefined;
    });
  }

  /**
   * getActiveUsers
   */
  public async getActiveUsers(): Promise<User[]> {
    return this._userRepository.find({
      isActive: true,
    });
  }

  public async saveSeenItems(
    user: User,
    items: LigaProItemDTO[]
  ): Promise<void> {
    if (user && items && items.length) {
      user.notifiedAtTS = new Date(Date.now());
      this._userRepository.save(user);

      var rows = items.map((it) => {
        return { user_id: user.id, item_id: it.getInternalId() };
      });

      this._userRepository
        .createQueryBuilder("user_items")
        .insert()
        .into("tg_user_items_seen")
        .values(rows)
        .printSql()
        .execute();
    } else {
      logger.error( {message:  "Unable to find user by UserId: %UserId", userId: user.id });
    }
  }
}
