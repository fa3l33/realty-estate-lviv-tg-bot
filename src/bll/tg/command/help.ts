import TextUtils from '../../../common/text-utils';
import config from '../../../config';
import { SessionContextFlavor } from './../session-context';

export default function help(ctx: SessionContextFlavor) {
     ctx.reply(`${ TextUtils.toBold(TextUtils.toUnderline('REALTY GROUP'))}\n\n`
     + `${ TextUtils.toBold('Адреса')}\n`
     + `м. Херсон, вул. Театральна, 17`, 
     {
          parse_mode: 'HTML'
     });

     let chatId = Number(ctx.chat?.id);
     ctx.api.sendContact(chatId, config.realtyGroup.MANAGER_PHONE as string, 'Realty Group');
}