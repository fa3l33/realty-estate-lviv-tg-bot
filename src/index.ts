import { config } from 'dotenv';
import { Bot } from 'grammy'
import { Menu } from '@grammyjs/menu'

config();

const bot = new Bot(process.env.TG_BOT_SECRET_KEY as string);

// Creating a simple menu
const menu = new Menu("my-menu-identifier")
  .text("A", (ctx) => ctx.reply("You pressed A and bbbb!")).row()
  .text("B", (ctx) => ctx.reply("You pressed B!"));

// Make it interactive
bot.use(menu);

bot.command("menu", async (ctx) => {
  // Send the menu:
  await ctx.reply("Check out this menu:", { reply_markup: menu });
});

bot.start()

