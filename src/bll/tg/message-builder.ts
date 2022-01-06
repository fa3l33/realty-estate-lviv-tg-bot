import { Item } from "./../../dal/model/rg_zoo/item";
import TextUtils from "../../common/text-utils";
import BotSession from "../../dal/interfaces/bot-session.interface";
import EnumHelper from "../enum-helper";
import config from "../../config";
import { CategoryHelper } from "../category-helper";
import { ItemElementType } from "../../dal/enums/tg/item-elemnt-type";
import ElementParser from "../elemens-parser";
import logger from "../logger";

export abstract class MessageBuilder {
  public static buildItemInfo(
    item: Item,
    includeDescription: boolean = false
  ): string {
    let itemInfo = `${TextUtils.toBold(item.name)}\n\n`;

    try {
      let elements = JSON.parse(item.elements);

      if (includeDescription) {
        itemInfo +=
          MessageBuilder.buildProperty(
            elements,
            ItemElementType.DESCRIPTION,
            "Опис:"
          ) + "\n";
      }

      itemInfo +=
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.PRICE_USD,
          "Вартість (usd):"
        ) +
        MessageBuilder.getPropertyType(item) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.ROOMS_COUNT,
          "Кількість кімнат:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.FLOOR,
          "Поверх:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.HOUSE_TOTAL_FLOORS,
          "Поверхів в будівлі:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.LAND_HOUSE_AREA,
          "Площа ділянки:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.TOTAL_AREA,
          "Загальні площа:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.LIVE_AREA,
          "Житлова площа:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.KITCHEN_AREA,
          "Площа кухні:"
        ) +
        MessageBuilder.buildProperty(
          elements,
          ItemElementType.DISTRICT,
          "Мікрорайон:"
        ) +
        `\n` +
        this.getSiteURL(item.id);
    } catch (error) {
      logger.error(error, "Unable to parser item's elements property.");
    }

    return itemInfo;
  }

  public static buildFilter(userSession: BotSession) {
    let filter =
      `${TextUtils.toBold("Налаштування")} \n\n` +
      `${TextUtils.toBold(
        TextUtils.toUnderline("Рубрика:")
      )} ${EnumHelper.propertyEnumToString(userSession.propertyType)}\n`;

    if (EnumHelper.hasApartmentsEnabled(userSession.propertyType)) {
      filter += `${TextUtils.toBold(
        TextUtils.toUnderline("Кількість кімнат:")
      )} ${EnumHelper.roomEnumToString(userSession.roomType)}\n`;
    }

    if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
      filter += `${TextUtils.toBold(
        TextUtils.toUnderline("Ціна: ")
      )} ${EnumHelper.priceEnumToString(userSession.priceType)}\n`;
    } else {
      filter += `${TextUtils.toBold(
        TextUtils.toUnderline("Ціна: ")
      )} ${EnumHelper.apartmentPriceEnumToString(
        userSession.apartmentPriceType
      )}\n`;
    }

    filter += `${TextUtils.toBold(
      TextUtils.toUnderline("Мікрорайон:")
    )} ${EnumHelper.districtEnumToString(userSession.districtType)}\n`;

    return filter;
  }

  private static getPropertyType(item: Item): string {
    // categories: apartment, house, land, commercial, new buildings
    let propertyCategory = item.categories.find((ct) =>
      [6, 7, 8, 9, 30].includes(ct.id)
    );

    if (propertyCategory) {
      return `${TextUtils.toBold("Рубрика:")} ${CategoryHelper.asString(
        propertyCategory.id
      )}\n`;
    }

    return "";
  }

  private static buildProperty(
    elements: any,
    itemElementType: ItemElementType,
    label: string
  ) {
    let property: string | undefined = undefined;

    if (itemElementType === ItemElementType.DISTRICT) {
      property = ElementParser.getOption(elements, itemElementType);
    } else {
      property = ElementParser.getValue(elements, itemElementType);
    }

    if (property !== undefined) {
      return `${TextUtils.toBold(label)} ${property}\n`;
    }

    return "";
  }

  private static getSiteURL(id: number): string {
    return TextUtils.toLink(
      "Переглянуті на сайті",
      (config.realtyGroup.SITE_URL as string) + `/item/${id}`
    );
  }
}
