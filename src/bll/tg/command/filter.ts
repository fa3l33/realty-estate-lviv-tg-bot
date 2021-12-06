import { SessionContextFlavor } from './../session-context';
import { propertyMenu } from './../menu/property-menu';


export default async function filter(ctx: SessionContextFlavor) {
    const userSession = await ctx.session;
    debugger;
    ctx.reply("There should be filter information", {
        reply_markup: propertyMenu,
    });
}