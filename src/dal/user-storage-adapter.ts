import { StorageAdapter } from 'grammy';
import { Repository } from 'typeorm';
import logger from '../bll/logger';
import BotSession from './interfaces/bot-session.interface';
import { User } from './model/tg/user';

export class TypeOrmAdapter implements StorageAdapter<BotSession> {
  private repository: Repository<User>
  
  constructor(opts: { repository: Repository<User> }) {
    this.repository = opts.repository;
  }

  async read(key: string) :  Promise<BotSession | undefined> {
    return this.repository.findOne(key);
  }

  async write(key: string, value: User) : Promise<void> {
    try {
      await this.repository.save(value);
    } catch (error) {
      logger.error({ message: 'User data cannot be saved.', error: error });
    } 
  }

  async delete(key: string) : Promise<void> {
    this.repository.delete(key);
  }
}