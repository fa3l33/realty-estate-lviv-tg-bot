import { getRepository, Repository } from 'typeorm';
import { User } from '../../../dal/model/tg/user';
import IUserService from "./iuser.service";

export default class UserService implements IUserService {
  private _userRepository: Repository<User>;

  constructor() {
    this._userRepository = getRepository(User);
  }

    public async getById(id: number): Promise<User | undefined> {
        return this._userRepository.findOne(id);
    }

  /**
   * getActiveUsers
   */
  public async getActiveUsers(): Promise<User[]> {
    return this._userRepository.find({
      isActive: true,
    });
  }
}