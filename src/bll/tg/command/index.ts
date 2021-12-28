import { Bot, } from 'grammy';

import { SessionContextFlavor } from '../session-context';
import cancel from './cancel';
import filter from './filter';
import help from './help';
import start from './start';
import { templateOne, initPropertyMenu} from './template-one';


export async function setCommands(bot: Bot<SessionContextFlavor>) {
    await bot.api.setMyCommands([
        { command: "start", description: "Початок" },
        { command: "help", description: "Допомога" },
        { command: "cancel", description: "Призупинити роботу бота" },
        { command: "filter", description: "Налаштування Фільтру" },
        { command: "message", description: "Вигляд Повідомлення" },
        { command: "filter2", description: "Налаштування Фільтру (menu)" },
    ]);
}

export function registerCommands(bot: Bot<SessionContextFlavor>) {
    bot.command("start", start);
    bot.command("filter", filter);
    bot.command("help", help);
    bot.command("cancel", cancel);
    bot.command("message", templateOne);
    bot.command("filter2", initPropertyMenu);
}
