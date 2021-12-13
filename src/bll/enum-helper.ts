import { hasFlag } from "../common/enum-utils";
import { DistrictType } from "../dal/enums/disctrict-type";
import { PropertyType } from "../dal/enums/property-type";
import { RoomType } from "../dal/enums/room-type";


// usually entries has reverse keyValue entry and original keyValue entry
// so we need to look only for second half and discard default value NONE
function enumToString(value: number, entries: [string, string | number][], mapFrom: Map<number, string>) : string {
    let startFrom = entries.length / 2;

    return entries
    .filter(((keyValue, index) => index > startFrom && hasFlag(value, Number(keyValue[1]))))
    .map((keyValue) => mapFrom.get(Number(keyValue[1]))).join(", ");
}

const propertyTypeMap: Map<number, string> = new Map<number, string>([
    [PropertyType.NONE, ""],
    [PropertyType.APARTMENT, "Квартиры"],
    [PropertyType.NEW_BUILDING, "Новостройки"],
    [PropertyType.HOUSE, "Дома"],
    [PropertyType.LAND, "Участки"],
    [PropertyType.COMMERCIAL, "Коммерция"],
]);

const roomTypeMap: Map<number, string> = new Map<number, string>([
    [RoomType.NONE, ""],
    [RoomType.ONE, "1"],
    [RoomType.TWO, "2"],
    [RoomType.THREE, "3"],
    [RoomType.FOUR_OR_MORE, "4 и более"],
]);

const districtTypeMap: Map<number, string> = new Map<number, string>([
    [DistrictType.NONE, ""],
    [DistrictType.TAVRICHESK, "Таврический"],
    [DistrictType.CENTER, "Центр"],
    [DistrictType.ZHILPOSELOK, "Жилпоселок"],
    [DistrictType.OSTROV, "Остров"],
    [DistrictType.SHUMENSKIY, "Шуменский"],
    [DistrictType.HBK, "ХБК"],
]);

export function propertyEnumToString(value: PropertyType): string {
    let entries = Object.entries(PropertyType);

    return enumToString(value, entries, propertyTypeMap);
}

export function roomEnumToString(value: RoomType): string {
    let entries = Object.entries(RoomType);
    
    return enumToString(value, entries, roomTypeMap);
}

export function districtEnumToString(value: DistrictType): string {
    let entries = Object.entries(DistrictType);

    return enumToString(value, entries, districtTypeMap);
}

export function hasApartmentsEnabled(value: PropertyType) {
    return hasFlag(value, PropertyType.APARTMENT) || hasFlag(value, PropertyType.NEW_BUILDING);
}