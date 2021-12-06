import { SessionContextFlavor } from './../session-context';
import BotSession from '../../../dal/interfaces/bot-session.interface';
import { User } from 'grammy/out/platform.node';

function mapFromToSession(userSession: BotSession, from: User | undefined) {
    if (userSession !== undefined && from !== undefined && userSession.id !== from.id) {
        userSession.id = from.id;
        userSession.firstName = from.first_name;
        userSession.lastName = from.last_name;
        userSession.username = from?.username;
        userSession.isBot = from.is_bot;
    }
}

/**
 * Start Command. Show default information.
 * @param ctx 
 */
export default async function start(ctx: SessionContextFlavor) {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from);

    ctx.reply("Thanks that you have chosen to use this bot, we will try to make it useful for you. Start working with bot by creating a new filter by using \"filter\" command.");
}