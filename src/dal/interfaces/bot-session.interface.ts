import { Session } from './session.interface';
import { User } from './user.interface';

/**
 * 
 */
export default interface BotSession extends User, Session { }