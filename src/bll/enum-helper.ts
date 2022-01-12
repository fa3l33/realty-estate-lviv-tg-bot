import { DistrictType } from './../dal/enums/tg/district-type';
import { PriceType } from './../dal/enums/tg/price-type';
import { RoomType } from './../dal/enums/tg/room-type';
import { PropertyType } from './../dal/enums/tg/property-type';
import { ApartmentPriceType } from '../dal/enums/tg/apartment-price-type';
import { hasFlag } from "../common/enum-utils";
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

    public static readonly priceTypeMap: Map<number, string> = new Map<number, string>([
        [PriceType.NONE, Constants.STRING_EMPTY],
        [PriceType.FROM_20_TO_40, Constants.PRICES.FROM_20_TO_40],
        [PriceType.FROM_40_TO_60, Constants.PRICES.FROM_40_TO_60],
        [PriceType.FROM_60_TO_100, Constants.PRICES.FROM_60_TO_100],
        [PriceType.FROM_100_AND_MORE, Constants.PRICES.FROM_100_AND_MORE],
    ]);

    public static readonly apartmentPriceTypeMap: Map<number, string> = new Map<number, string>([
        [ApartmentPriceType.NONE, Constants.STRING_EMPTY],
        [ApartmentPriceType.FROM_20_TO_35, Constants.APARTMENT_PRICES.FROM_20_TO_35],
        [ApartmentPriceType.FROM_35_TO_45, Constants.APARTMENT_PRICES.FROM_35_TO_45],
        [ApartmentPriceType.FROM_45_TO_60, Constants.APARTMENT_PRICES.FROM_45_TO_60],
        [ApartmentPriceType.FROM_60_AND_MORE, Constants.APARTMENT_PRICES.FROM_60_AND_MORE],
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
    
    public static priceEnumToString(value: PriceType) : string {
        let entries = Object.entries(PriceType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.priceTypeMap);
    }

    public static apartmentPriceEnumToString(value: ApartmentPriceType) : string {
        let entries = Object.entries(ApartmentPriceType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.apartmentPriceTypeMap);
    }
    
    public static districtEnumToString(value: DistrictType): string {
        let entries = Object.entries(DistrictType);
        
        return EnumHelper.enumToString(value, entries, EnumHelper.districtTypeMap);
    }
    
    /**
     * Check if value has APARTMENT or NEW_BUILDING flags
     */
    public static hasApartmentsEnabled(value: PropertyType) : boolean {
        return hasFlag(value, PropertyType.APARTMENT) || hasFlag(value, PropertyType.NEW_BUILDING);
    }

    /**
     * Check if value has HOUSE or LAND or COMMERCIAL flags
     */
    public static hasNonApartmentEnabled(value: PropertyType) : boolean {
        return hasFlag(value, PropertyType.HOUSE) || hasFlag(value, PropertyType.LAND) || hasFlag(value, PropertyType.COMMERCIAL);
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