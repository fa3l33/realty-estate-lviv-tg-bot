import { Menu } from '@grammyjs/menu';
import { config } from 'dotenv';
import { Bot, Context, lazySession, LazySessionFlavor, session, SessionFlavor } from 'grammy'
import { registerCommands, setCommands } from './bll/tg/command';
import getMenus from './bll/tg/menu';
import { initialize, SessionContextFlavor } from './bll/tg/session-context';
import BotSession from './dal/interfaces/bot-session.interface';

config();

const bot = new Bot<SessionContextFlavor>(process.env.TG_BOT_SECRET_KEY as string);

bot.use(lazySession({ initial: initialize }));
bot.use(getMenus());
setCommands(bot);
registerCommands(bot);

bot.catch((value) => {
  console.log(value);  
});

bot.start()

