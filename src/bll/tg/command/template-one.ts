
import { Item } from "./../../../dal/model/rg_zoo/item";

import { InlineKeyboard } from "grammy";
import config from "../../../config";
import { MessageBuilder } from "../message-builder";
import { getUserSession, SessionContextFlavor } from "./../session-context";
import { getRepository } from "typeorm";

export const imageURLs: Array<string> = [
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg0000.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg11111.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg54334.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg88888.jpg",
];

export async function templateOne(ctx: SessionContextFlavor) {
  let chatId: number = Number(ctx.chat?.id);
  let userSession = await getUserSession(ctx);

  ctx.api
    .sendMediaGroup(chatId, [
      {
        media: imageURLs[0],
        type: "photo",
      },
      {
        media: imageURLs[1],
        type: "photo",
      },
      {
        media: imageURLs[2],
        type: "photo",
      },
      {
        media: imageURLs[3],
        type: "photo",
        // caption: MessageBuilder.buildMessage(),
        // parse_mode: "HTML",
      },
    ])
    .then(async (messages) => {
      let item = await getRepository(Item).findOne(75001, {
        relations: ["categories"],
      });

      if (item) {
        ctx.reply(MessageBuilder.buildItemInfo(item), {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().text(
            "Дізнатись більше у менеджера",
            `${userSession.id}-1232534`
          ),
        });
      }

      // ctx.api.editMessageReplyMarkup(lastMesasge.chat.id, lastMesasge.message_id, {
      //   reply_markup: new InlineKeyboard().text('Ohaio', '1241256')
      // });

      // ctx.reply('Give me your phone', {
      //   reply_markup:
      //   {
      //     one_time_keyboard: true,
      //     keyboard: new Keyboard().requestContact('Share your phone number.').build(),
      //     resize_keyboard: true
      //   }
      // });

      ctx.api.sendContact(
        chatId,
        config.realtyGroup.MANAGER_PHONE as string,
        "Realty Group"
      );
    });
}