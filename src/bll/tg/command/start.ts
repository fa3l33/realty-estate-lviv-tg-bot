import { mapFromToSession, SessionContextFlavor } from './../session-context';

/**
 * Start Command. Show default information.
 * @param ctx 
 */
export default async function start(ctx: SessionContextFlavor) {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from);

    ctx.reply("Thanks that you have chosen to use this bot, we will try to make it useful for you. Start working with bot by creating a new filter by using \"filter\" command.");
}