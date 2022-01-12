import { Session } from './isession';
import { User } from './iuser';

/**
 * 
 */
export default interface BotSession extends User, Session { }