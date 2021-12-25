import { PropertyType } from './../../../dal/enums/property-type';
//import { InlineKeyboard } from 'grammy';
import { Keyboard } from 'grammy';
import config from '../../../config';
import Constants from '../constants';
import { buildCheckedMenu } from '../menu/menu-helper';
import { MessageBuilder } from '../message-builder';
import { getUserSession, SessionContextFlavor } from './../session-context';

export const imageURLs: Array<string> = ["http://www.realtygroup.info/images/realty/39072/viber image.jpg0000.jpg", "http://www.realtygroup.info/images/realty/39072/viber image.jpg11111.jpg",
            "http://www.realtygroup.info/images/realty/39072/viber image.jpg54334.jpg", "http://www.realtygroup.info/images/realty/39072/viber image.jpg88888.jpg"];

export async function templateOne(ctx: SessionContextFlavor) {
    let chatId: number = Number(ctx.chat?.id);

    ctx.api.sendMediaGroup(chatId, [{
        media: imageURLs[0],
        type: "photo"
    },
    {
        media: imageURLs[1],
        type: "photo"        
    },
    {
        media: imageURLs[2],
        type: "photo"
    },
    {
        media: imageURLs[3],
        type: "photo",
        caption: MessageBuilder.buildMessage(),
        parse_mode: "HTML"
    }]).then(() => {
        ctx.api.sendContact(chatId, config.realtyGroup.MANAGER_PHONE as string, 'Realty Group');
    });
}

export async function templateMenu(ctx: SessionContextFlavor) {
    //let chatId: number = Number(ctx.chat?.id);

    let userSession = await getUserSession(ctx);
    let propertyBtn: string = await buildCheckedMenu(
          Constants.NEW_BUILDING,
          userSession.propertyType,
          PropertyType.NEW_BUILDING
        );
    let houseBtn: string = await buildCheckedMenu(
        Constants.HOUSE,
        userSession.propertyType,
        PropertyType.HOUSE
      );

    let landBtn: string = await buildCheckedMenu(
        Constants.LAND,
        userSession.propertyType,
        PropertyType.LAND
      );

    let commercialBtn: string = await buildCheckedMenu(
        Constants.COMMERCIAL,
        userSession.propertyType,
        PropertyType.COMMERCIAL
      );

    let nextBtn = Constants.NEXT;

    const keyboard = new Keyboard().text(propertyBtn).row()
        .text(houseBtn).row()
        .text(landBtn).row()
        .text(commercialBtn).row()
        .text(nextBtn);

    await ctx.reply('some random text', {
      reply_markup: {
        keyboard: keyboard.build(),
        force_reply: true
      },
    });    
}