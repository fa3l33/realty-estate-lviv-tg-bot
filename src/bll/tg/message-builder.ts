import { ItemElementType } from './../../dal/enums/item-elemnt-type';
import { ItemElementMap } from './../../dal/item-element-map';
import { Item } from './../../dal/model/rg_zoo/item';
import TextUtils from '../../common/text-utils';
import BotSession from '../../dal/interfaces/bot-session.interface';
import EnumHelper from '../enum-helper';
import config from '../../config';
import { CategoryHelper } from '../category-helper';


export abstract class MessageBuilder {
    private static readonly VALUE: string = 'value';
    private static readonly FIRST_PROPERTY = '0';
    private static readonly OPTION: string = 'option';

    public static buildMessage(item: Item) : string {
        let elements = JSON.parse(item.elements);

        return (
          `${TextUtils.toBold(item.name)}\n\n` +
          MessageBuilder.getValue(elements, ItemElementType.DESCRIPTION, 'Опис:') + '\n' +
          MessageBuilder.getValue(elements, ItemElementType.PRICE_USD, 'Вартість (usd):') +
          MessageBuilder.getPropertyType(item) +
          MessageBuilder.getDistrict(elements) +
          MessageBuilder.getValue(elements, ItemElementType.ROOMS_COUNT, 'Кількість кімнат:') +
          MessageBuilder.getValue(elements, ItemElementType.FLOOR, 'Поверх:') +
          MessageBuilder.getValue(elements, ItemElementType.HOUSE_TOTAL_FLOORS, 'Поверхів в будівлі:') +
          MessageBuilder.getValue(elements, ItemElementType.LAND_HOUSE_AREA, 'Площа ділянки:') +
          MessageBuilder.getValue(elements, ItemElementType.TOTAL_AREA, 'Загальні площа:') +
          MessageBuilder.getValue(elements, ItemElementType.LIVE_AREA, 'Житлова площа:') +
          MessageBuilder.getValue(elements, ItemElementType.KITCHEN_AREA, 'Площа кухні:') +
          `\n` + this.getSiteURL(item.id)
        );
    }

    public static buildFilter(userSession: BotSession) {
        let filter = `${ TextUtils.toBold('Налаштування') } \n\n`    
        + `${ TextUtils.toBold(TextUtils.toUnderline('Рубрика:')) } ${EnumHelper.propertyEnumToString(userSession.propertyType)}\n`
        
        if (EnumHelper.hasApartmentsEnabled(userSession.propertyType))
        {
            filter += `${ TextUtils.toBold(TextUtils.toUnderline('Кількість кімнат:')) } ${ EnumHelper.roomEnumToString(userSession.roomType)}\n`;
        }
        
        if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
            filter += `${ TextUtils.toBold(TextUtils.toUnderline('Ціна: '))} ${ EnumHelper.priceEnumToString(userSession.priceType)}\n`;
        } else {
            filter += `${ TextUtils.toBold(TextUtils.toUnderline('Ціна: '))} ${ EnumHelper.apartmentPriceEnumToString(userSession.apartmentPriceType)}\n`;
        }

        filter += `${ TextUtils.toBold(TextUtils.toUnderline('Мікрорайон:'))} ${EnumHelper.districtEnumToString(userSession.districtType)}\n`;

        return filter;
    }

    private static getPropertyType(item: Item) : string {
        // categories: apartment, house, land, commercial, new buildings
        let propertyCategory = item.categories.find((ct) => [6, 7, 8, 9, 30].includes(ct.id));
    
        if (propertyCategory) {
            return `${ TextUtils.toBold('Рубрика:') } ${ CategoryHelper.asString(propertyCategory.id) }\n`;
        }

        return '';
    }

    private static getValue(elements: any, itemElementType: ItemElementType, label: string) 
    {
        let values = elements[ItemElementMap.get(itemElementType)!];

        if (values && values[this.FIRST_PROPERTY] && values[this.FIRST_PROPERTY][this.VALUE]) {
            return `${ TextUtils.toBold(label)} ${values[this.FIRST_PROPERTY][this.VALUE]}\n`;
        }

        return '';
    }

    private static getDistrict(elements: any) : string {
        let values = elements[ItemElementMap.get(ItemElementType.DISTRICT)!];

        if (values && values[this.OPTION] && values[this.OPTION][this.FIRST_PROPERTY]) {
            return `${ TextUtils.toBold('Мікрорайон:')} ${values[this.OPTION][this.FIRST_PROPERTY]}\n`;
        }

        return '';
    }        

    private static getSiteURL(id: number) : string{
        return TextUtils.toLink('Переглянуті на сайті', (config.realtyGroup.SITE_URL as string) + `/item/${id}`);
    }
}