import { Bot } from "grammy";
import MenuComposer from "../menu/menu-composer";
import { SessionContextFlavor } from "../session-context";
import cancel from "./cancel";
import help from "./help";
import start from "./start";

export default abstract class CommandHelper {
  public static init(bot: Bot<SessionContextFlavor>) {
    var menuComposer = new MenuComposer();
    
    bot.api.setMyCommands([
        { command: "start", description: "Початок" },
        { command: "filter", description: "Налаштування Фільтру" },
        { command: "help", description: "Допомога" },
        { command: "cancel", description: "Призупинити роботу бота" }
    ]);
    
    bot.command("start", start);
    bot.command("filter", (ctx) => menuComposer.sendDefaultMenu(ctx));
    bot.command("help", help);
    bot.command("cancel", cancel);

    menuComposer.addListener(bot);
  }
}
