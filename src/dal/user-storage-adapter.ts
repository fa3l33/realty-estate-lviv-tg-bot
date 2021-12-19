import { StorageAdapter } from 'grammy';
import { Repository } from 'typeorm';
import BotSession from './interfaces/bot-session.interface';
import { User } from './model/tg/user';

export class TypeOrmAdapter implements StorageAdapter<BotSession> {
  private repository: Repository<User>
  
  constructor(opts: { repository: Repository<User> }) {
    this.repository = opts.repository;
  }

  async read(key: string) :  Promise<BotSession | undefined> {
      var test = await this.repository.findOne(key);
      console.log(test);
    return this.repository.findOne(key);
  }

  async write(key: string, value: User) : Promise<void> {
      this.repository.save(value);
  }

  async delete(key: string) : Promise<void> {
    this.repository.delete(key);
  }
}