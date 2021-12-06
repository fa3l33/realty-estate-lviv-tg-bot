import { SessionContextFlavor } from './../session-context';

export default async function help(ctx: SessionContextFlavor) {
     ctx.reply("Help Command should return all command description and bot description.");
}