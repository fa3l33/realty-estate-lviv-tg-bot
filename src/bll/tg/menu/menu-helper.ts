import { PriceType } from './../../../dal/enums/tg/price-type';
import { DistrictType } from './../../../dal/enums/tg/district-type';
import { RoomType } from './../../../dal/enums/tg/room-type';
import { PropertyType } from './../../../dal/enums/tg/property-type';
import { Menu } from "@grammyjs/menu";
import { Context } from "grammy";
import BotSession from "../../../dal/interfaces/bot-session.interface";
import { hasFlag, toggleFlag } from "../../../common/enum-utils";
import { addChecked } from "../../emoji";
import { MessageBuilder } from "../message-builder";
import { ApartmentPriceType } from "../../../dal/enums/tg/apartment-price-type";

export const PROPERTY_MENU = "PROPERTY-MENU";
export const ROOM_MENU = "ROOM-MENU";
export const PRICE_MENU = "PRICE-MENU"
export const DISTRICT_MENU = "DISTRICT-MENU";

export function buildCheckedMenu(
  menuValue: string,
  value: number,
  checkFlag: number
) {
  if (hasFlag(value, checkFlag)) {
    return addChecked(menuValue);
  }

  return menuValue;
}

export function togglePropertyFlag(
  userSession: BotSession,
  propertyFlag: PropertyType
) {
  userSession.propertyType = toggleFlag(userSession.propertyType, propertyFlag);
}

export function toggleRoomFlag(userSession: BotSession, roomFlag: RoomType) {
  userSession.roomType = toggleFlag(userSession.roomType, roomFlag);
}

export function toggleDistrictFlag(
  userSession: BotSession,
  districtFlag: DistrictType
) {
  userSession.districtType = toggleFlag(userSession.districtType, districtFlag);
}

export function togglePriceFlag(
  userSession: BotSession,
  priceFlag: PriceType
) {
  userSession.priceType = toggleFlag(userSession.priceType, priceFlag);
}

export function toggleApartmentPriceFlag(
  userSession: BotSession,
  apartmentPriceFlag: ApartmentPriceType
) {
  userSession.apartmentPriceType = toggleFlag(userSession.apartmentPriceType, apartmentPriceFlag);
}

// edit filter text on menu click
export function editFilterTextOnMenuClick(
  ctx: Context,
  userSession: BotSession,
  menu: Menu
) {
  let message = ctx.update.callback_query?.message;

  if (message && message.chat.id) {
    let chatId = message?.chat.id;
    let messageId = message?.message_id;

    ctx.api.editMessageText(chatId, messageId, MessageBuilder.buildFilter(userSession), {
      parse_mode: "HTML",
      reply_markup: menu,
    });
  }
}
