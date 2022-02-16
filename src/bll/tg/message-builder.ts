import TextUtils from "../../common/text-utils";
import BotSession from "../../dal/interfaces/bot-session.interface";
import EnumHelper from "../enum-helper";
import dayjs = require("dayjs");
import LigaProItemDTO from "../dto/liga-pro-item.dto";

export abstract class MessageBuilder {
  public static buildItemInfo(
    item: LigaProItemDTO,
    includeDescription: boolean = false
  ): string {
    let itemInfo = `${TextUtils.toBold(item.getTitle())}\n\n`;
    if (includeDescription) {
      itemInfo += this.buildProperty(item.getDescription(), "Опис:") + '\n';
    }

    itemInfo +=
      this.buildProperty(item.getPriceUSD(), "Вартість (usd):")
      + this.buildProperty(item.getType(), "Рубрика:")
      + this.buildProperty(item.getRoomsCount(), "Кількість кімнат:")
      + this.buildProperty(item.getFloor(), "Поверх:")
      + this.buildProperty(item.getFloorTotal(), "Поверхів в будівлі:")
      + this.buildProperty(item.getLotAreaValue() + ' ' + item.getLotAreaUnit(), "Площа ділянки:")
      + this.buildProperty(item.getAreaValue() + ' ' + item.getAreaUnit(), "Загальні площа:")
      + this.buildProperty(item.getLivingSpaceValue() + ' ' + item.getLivingSpaceUnit(), "Житлова площа:")
      + this.buildProperty(item.getKitchenSpaceValue() + ' ' + item.getKitchenSpaceUnit(), "Площа кухні:")
      + this.buildProperty(EnumHelper.ligaProDistrictMap.get(item.getSubLocalityName()) || '', "Мікрорайон:")
      + `\n`
      + this.getSiteURL(item.getURL());

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

  public static buildConnectionResponse(
    isPhoneResponse: boolean = false
  ): string {
    const hour = dayjs().hour();
    const shouldContactToday = hour >= 9 && hour < 16;

    if (isPhoneResponse) {
      if (shouldContactToday) {
        return "Ми зателефонуємо Вам найближчим часом протягом 1 години.";
      } else {
        return "Ми зателефонуємо Вам завтра з 9 години.";
      }
    } else {
      if (shouldContactToday) {
        return "Наш менеджер надішле Вам приватне повідомлення протягом 1 години.";
      } else {
        return "Наш менеджер надішле Вам завтра приватне повідомлення.";
      }
    }
  }

  private static buildProperty(value: string, label: string) {
    if (value !== undefined && value.trim()) {
      return `${TextUtils.toBold(label)} ${value}\n`;
    }

    return "";
  }

  private static getSiteURL(url: string): string {
    return TextUtils.toLink("Переглянуті на сайті", url);
  }
}
