import 'reflect-metadata';
import config from './config';
import { Bot, lazySession } from 'grammy'
import { createConnection } from 'typeorm';
import { registerCommands, setCommands } from './bll/tg/command';
import getMenus from './bll/tg/menu';
import { initialize, SessionContextFlavor } from './bll/tg/session-context';
import { User } from './dal/model/tg/user';
import { TypeOrmAdapter } from './dal/user-storage-adapter';

async function bootstrap() {
  // create global MySql connection
  const connection = await createConnection();  
  
  const bot = new Bot<SessionContextFlavor>(config.telegram.BOT_SECRET_KEY as string);
  
  bot.use(lazySession({
     initial: initialize,
     storage: new TypeOrmAdapter({ repository: connection.getRepository(User) })
   }));

  bot.use(getMenus());
  setCommands(bot);
  registerCommands(bot);
  
  bot.catch((value) => {
    console.log(value);  
  });
  
  bot.start()  
}

bootstrap();