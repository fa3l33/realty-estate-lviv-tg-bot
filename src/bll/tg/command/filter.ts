import { mapFromToSession, SessionContextFlavor } from './../session-context';
import { propertyMenu } from './../menu/property-menu';
import { MessageBuilder } from '../message-builder';


export default async function filter(ctx: SessionContextFlavor) {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from);
    
    ctx.reply(MessageBuilder.buildFilter(userSession), {
         parse_mode: "HTML",
        reply_markup: propertyMenu,
    });
}