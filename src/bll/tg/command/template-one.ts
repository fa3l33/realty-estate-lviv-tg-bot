//import { InlineKeyboard } from 'grammy';
import config from '../../../config';
import { MessageBuilder } from '../message-builder';
import { SessionContextFlavor } from './../session-context';

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
