import { Bot, } from 'grammy';

import { SessionContextFlavor } from '../session-context';
import cancel from './cancel';
import filter from './filter';
import help from './help';
import start from './start';
import { templateOne, templateTwo } from './template-one';


export async function setCommands(bot: Bot<SessionContextFlavor>) {
    await bot.api.setMyCommands([
        { command: "start", description: "Bot information" },
        { command: "help", description: "Contact information." },
        { command: "cancel", description: "Discard notification." },
        { command: "filter", description: "Filter editing." },
        { command: "one", description: "Template 1" },
        { command: "two", description: "Template 2" },
    ]);
}

export function registerCommands(bot: Bot<SessionContextFlavor>) {
    bot.command("start", start);
    bot.command("filter", filter);
    bot.command("help", help);
    bot.command("cancel", cancel);
    bot.command("one", templateOne);
    bot.command("two", templateTwo);
}
