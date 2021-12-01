import { Bot } from 'grammy';
import cancel from './cancel';
import filter from './filter';
import help from './help';
import info from './info';
import start from './start';

export async function setCommands(bot: Bot) {
    await bot.api.setMyCommands([
        { command: "start", description: "Use this command to start the bot." },
        { command: "help", description: "Use this command to get list of all commands and bot description." },
        { command: "cancel", description: "Use this command to cancel any applied filter. " },
        { command: "filter", description: "Use this command to create or update filter." },
        { command: "info",  description: "Use this command to get filter information." }
    ]);
}

export function registerCommands(bot: Bot) {
    bot.command("start", start);
    bot.command("help", help);
    bot.command("info", info);
    bot.command("filter", filter);
    bot.command("cancel", cancel);
}
