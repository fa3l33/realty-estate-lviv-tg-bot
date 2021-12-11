import { mapFromToSession, SessionContextFlavor } from './../session-context';
import { propertyMenu } from './../menu/property-menu';
import { buildFilter } from '../filter-builder';


export default async function filter(ctx: SessionContextFlavor) {
    const userSession = await ctx.session;
    mapFromToSession(userSession, ctx.from);
    
    ctx.reply(buildFilter(userSession), {
         parse_mode: "HTML",
        reply_markup: propertyMenu,
    });
}