import { hasFlag } from "../common/enum-utils";
import { DistrictType } from "../dal/enums/disctrict-type";
import { PropertyType } from "../dal/enums/property-type";
import { RoomType } from "../dal/enums/room-type";
import Constants from "./tg/constants";

export default abstract class EnumHelper {
    public static readonly propertyTypeMap: Map<number, string> = new Map<number, string>([
        [PropertyType.NONE, Constants.STRING_EMPTY],
        [PropertyType.APARTMENT, Constants.APARTMENT],
        [PropertyType.NEW_BUILDING, Constants.NEW_BUILDING],
        [PropertyType.HOUSE, Constants.HOUSE],
        [PropertyType.LAND, Constants.LAND],
        [PropertyType.COMMERCIAL, Constants.COMMERCIAL],
    ]);
    
    public static readonly roomTypeMap: Map<number, string> = new Map<number, string>([
        [RoomType.NONE, Constants.STRING_EMPTY],
        [RoomType.ONE, Constants.ONE],
        [RoomType.TWO, Constants.TWO],
        [RoomType.THREE, Constants.THREE],
        [RoomType.FOUR_OR_MORE, Constants.FOUR_OR_MORE],
    ]);
    
    public static readonly districtTypeMap: Map<number, string> = new Map<number, string>([
        [DistrictType.NONE, Constants.STRING_EMPTY],
        [DistrictType.TAVRICHESK, Constants.TAVRICHESK],
        [DistrictType.CENTER, Constants.CENTER],
        [DistrictType.ZHILPOSELOK, Constants.ZHILPOSELOK],
        [DistrictType.OSTROV, Constants.OSTROV],
        [DistrictType.SHUMENSKIY, Constants.SHUMENSKIY],
        [DistrictType.HBK, Constants.HBK],
    ]);
    
    public static propertyEnumToString(value: PropertyType): string {
        let entries = Object.entries(PropertyType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.propertyTypeMap);
    }
    
    public static roomEnumToString(value: RoomType): string {
        let entries = Object.entries(RoomType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.roomTypeMap);
    }
    
    public static districtEnumToString(value: DistrictType): string {
        let entries = Object.entries(DistrictType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.districtTypeMap);
    }
    
    public static hasApartmentsEnabled(value: PropertyType) {
        return hasFlag(value, PropertyType.APARTMENT) || hasFlag(value, PropertyType.NEW_BUILDING);
    }

    // usually entries has reverse keyValue entry and original keyValue entry
    // so we need to look only for second half and discard default value NONE
    private static enumToString(value: number, entries: [string, string | number][], mapFrom: Map<number, string>) : string {
        let startFrom = entries.length / 2;
    
        return entries
        .filter(((keyValue, index) => index > startFrom && hasFlag(value, Number(keyValue[1]))))
        .map((keyValue) => mapFrom.get(Number(keyValue[1]))).join(", ");
    }
}