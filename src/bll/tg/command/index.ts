import { Bot, } from 'grammy';
import { SessionContextFlavor } from '../session-context';
import cancel from './cancel';
import filter from './filter';
import help from './help';
import start from './start';

export async function setCommands(bot: Bot<SessionContextFlavor>) {
    await bot.api.setMyCommands([
        { command: "start", description: "Bot information" },
        { command: "help", description: "Contact information." },
        { command: "cancel", description: "Discard notification." },
        { command: "filter", description: "Filter editing." },
    ]);
}

export function registerCommands(bot: Bot<SessionContextFlavor>) {
    bot.command("start", start);
    bot.command("filter", filter);
    bot.command("help", help);
    bot.command("cancel", cancel);
}
