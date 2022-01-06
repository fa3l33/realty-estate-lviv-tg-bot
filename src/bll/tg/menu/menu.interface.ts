import { RawApi, Keyboard, Bot, Api } from 'grammy';
import { SessionContextFlavor } from './../session-context';
import BotSession from '../../../dal/interfaces/bot-session.interface';

export default interface IMenu {
    getMenu(userSession: BotSession): Keyboard;
    addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void;
}