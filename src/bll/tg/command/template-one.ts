import { InlineKeyboard } from 'grammy';
import { SessionContextFlavor } from './../session-context';

export const imageURLs: Array<string> = ["http://www.realtygroup.info/images/realty/39072/viber image.jpg0000.jpg", "http://www.realtygroup.info/images/realty/39072/viber image.jpg11111.jpg",
            "http://www.realtygroup.info/images/realty/39072/viber image.jpg54334.jpg", "http://www.realtygroup.info/images/realty/39072/viber image.jpg88888.jpg"];

function oneMsg() {
    return `<b>Продам 2-комнатную квартиру</b>
    
Тип объекта: <b>Новостройка</b>
Комнаты: <b>2</b>
Район: <b>ХБК</b>
Добавлен: <b>01.12.2021</b>

<a href="http://www.realtygroup.info/">Check on Site</a>
 `;
}

function twoMsg() {
    return `<b>Продам 2-комнатную квартиру</b>
    
Тип объекта: <b>Новостройка</b>
Комнаты: <b>2</b>
Район: <b>ХБК</b>
Добавлен: <b>01.12.2021</b>
 `;
}

const inlineKeyboard = new InlineKeyboard().url(
    "Check on Site",
    "http://www.realtygroup.info/",
  );

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
        media: imageURLs[2],
        type: "photo"
    },
    {
        media: imageURLs[3],
        type: "photo",
        caption: oneMsg(),
        parse_mode: "HTML"
    }]);
}

export async function templateTwo(ctx: SessionContextFlavor) {
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
        media: imageURLs[2],
        type: "photo"
    },
    {
        media: imageURLs[3],
        type: "photo",
    }], ).then((messages) => {
        ctx.api.sendMessage(messages[0].chat.id, twoMsg(), {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard
        });
    });
}
