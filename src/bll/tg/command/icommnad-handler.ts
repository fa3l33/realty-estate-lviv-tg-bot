import { Bot } from 'grammy';
import { SessionContextFlavor } from './../session-context';
export default interface ICommandHandler {
    register(bot: Bot<SessionContextFlavor>) : void;
}