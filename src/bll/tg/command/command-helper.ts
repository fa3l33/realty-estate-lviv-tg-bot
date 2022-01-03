import { Bot } from "grammy";
import MenuComposer from "../menu/menu-composer";
import { SessionContextFlavor } from "../session-context";
import cancel from "./cancel";
import help from "./help";
import start from "./start";
import { templateOne } from "./template-one";

export default abstract class CommandHelper {
  public static init(bot: Bot<SessionContextFlavor>) {
    var menuComposer = new MenuComposer();
    
    bot.api.setMyCommands([
        { command: "start", description: "Початок" },
        { command: "help", description: "Допомога" },
        { command: "cancel", description: "Призупинити роботу бота" },
        { command: "filter", description: "Налаштування Фільтру" },
        { command: "message", description: "Вигляд Повідомлення" },
        { command: "filter2", description: "Налаштування Фільтру (menu)" },
    ]);
    
    bot.command("start", start);
    bot.command("filter", (ctx) => menuComposer.sendDefaultMenu(ctx));
    bot.command("help", help);
    bot.command("cancel", cancel);
    bot.command("message", templateOne);

    menuComposer.addListener(bot);
  }
}
