//import { Item } from './../../dal/model/rg_zoo/item';
import TextUtils from '../../common/text-utils';
import Constants from './constants';
import BotSession from '../../dal/interfaces/bot-session.interface';
import EnumHelper from '../enum-helper';
import config from '../../config';
import { URL } from 'url';


export abstract class MessageBuilder { 
    public static buildMessage() : string {
        return (
          `${TextUtils.toBold('Item Name')}\n\n` +
          MessageBuilder.getDescription() +
          MessageBuilder.getPrice() +
          MessageBuilder.getPropertyType() +
          MessageBuilder.getDistrict() +
          MessageBuilder.getRooms() +
          MessageBuilder.getFloor() +
          MessageBuilder.getHouseFloors() +
          MessageBuilder.getHouseArea() +
          MessageBuilder.getTotalArea() +
          MessageBuilder.getLiveArea() +
          MessageBuilder.getKitchenArea() +
          `\n` + this.getSiteURL()
        );
    }

    public static buildFilter(userSession: BotSession) {
        let filter = `${ TextUtils.toBold('Налаштування') } \n\n`    
        + `${ TextUtils.toBold(TextUtils.toUnderline('Рубрика:')) } ${EnumHelper.propertyEnumToString(userSession.propertyType)}\n`
        + `${ TextUtils.toBold(TextUtils.toUnderline('Мікрорайон:'))} ${EnumHelper.districtEnumToString(userSession.districtType)}\n`;

        if (EnumHelper.hasApartmentsEnabled(userSession.propertyType))
        {
            filter += `${ TextUtils.toBold(TextUtils.toUnderline('Кількість кімнат:')) } ${ EnumHelper.roomEnumToString(userSession.roomType)}\n`;
        }

        return filter;
    }

    private static getPropertyType() : string {
        return `Рубрика: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getPrice() : string {
        return `Вартість: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getDistrict() : string {
        return `Мікрорайон: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    
    private static getRooms() : string {
        return `Кількість кімнат: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }
    
    private static getFloor() : string {
        return `Поверх: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }
    
    private static getHouseFloors() : string {
        return `Поверхів в будівлі: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getTotalArea() : string {
        return `Загальні площа: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getLiveArea() : string {
        return `Житлова площа: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getKitchenArea() : string {
        return `Площа кухні: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getHouseArea() : string {
        return `Площа ділянки: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getDescription() : string {
        return `Опис: ${ TextUtils.toBold(Constants.NEW_BUILDING) }\n`;
    }

    private static getSiteURL() : string{
        return TextUtils.toLink('Переглянуті на сайті', new URL(config.realtyGroup.SITE_URL as string));
    }
}