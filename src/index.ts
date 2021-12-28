import 'reflect-metadata';
import config from './config';
import { Bot, Keyboard, lazySession } from 'grammy'
import { createConnection } from 'typeorm';
import { registerCommands, setCommands } from './bll/tg/command';
import getMenus from './bll/tg/menu';
import { initialize, SessionContextFlavor } from './bll/tg/session-context';
import { User } from './dal/model/tg/user';
import { TypeOrmAdapter } from './dal/user-storage-adapter';
import { registerMenuCallbacks } from './bll/tg/command/template-one';

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

  registerMenuCallbacks(bot);
  
  bot.on('message:contact', ctx => {
    ctx.reply('thx', 
    {
      reply_markup: {remove_keyboard: true }
    });
  });

  bot.on('callback_query:data', ctx => {    
    ctx.answerCallbackQuery();
    console.log(ctx.callbackQuery.data);    

      ctx.reply(`Оберіть спосіб для зворотнього зв'язку.`, {
        reply_markup: 
        {
          one_time_keyboard: true,
          keyboard: new Keyboard().requestContact('Зателефонуйте мені\n (поділитися номером телефону)').row().text('Напишіть мені.').build(),
          resize_keyboard: true,
          selective: true,
          input_field_placeholder: `Оберіть спосіб для зворотнього зв'язку.`
        }
      });
  });
  
  bot.catch((value) => {
    console.log(value);  
  });
  
  bot.start()  
}

bootstrap();