import { DistrictType } from "../../../dal/enums/disctrict-type";
import { PropertyType } from "../../../dal/enums/property-type";
import { RoomType } from "../../../dal/enums/room-type";
import BotSession from "../../../dal/interfaces/bot-session.interface";
import { hasFlag, toggleFlag } from "../../common/enum-utils";
import { addChecked } from "../../emoji";

export const PROPERTY_MENU = "PROPERTY-MENU";
export const ROOM_MENU = "ROOM-MENU";
export const DISTRICT_MENU = "DISTRICT-MENU";

export const NEW_BUILDING: string = "Новостройки";
export const APARTMENT: string = "Квартиры";
export const HOUSE: string = "Дома";
export const LAND: string = "Участки";
export const COMMERCIAL: string = "Коммерция";

export const ONE: string = "1";
export const TWO: string = "2";
export const THREE: string = "3";
export const FOUR_OR_MORE: string = "4 или более";

export const TAVRICHESK: string = "Тавричекс";
export const CENTER: string = "Центр";
export const ZHILPOSELOK: string = "Жилпоселок";
export const OSTROV: string = "Остров";
export const SHUMENSKIY: string = "Шуменский";
export const HBK: string = "ХБК";

export const BACK: string = "⬅ Назад";
export const NEXT: string = "Далее ➡"
export const READY: string = "Готово";

export async function buildCheckedMenu(menuValue: string, value: number, checkFlag: number) { 
    if (hasFlag(value, checkFlag)) {
      return addChecked(menuValue);
    }
 
   return menuValue;
 }
 
 export function togglePropertyFlag(userSession: BotSession, propertyFlag: PropertyType) {
   userSession.propertyType = toggleFlag(userSession.propertyType, propertyFlag);
 }

 export function toggleRoomFlag(userSession: BotSession, roomFlag: RoomType) {
    userSession.roomType = toggleFlag(userSession.roomType, roomFlag);
  }

  export function toggleDistrictFlag(userSession: BotSession, districtFlag: DistrictType) {
    userSession.districtType = toggleFlag(userSession.districtType, districtFlag);
  }