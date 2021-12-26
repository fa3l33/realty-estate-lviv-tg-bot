import { PropertyType } from "../dal/enums/property-type";
import EnumHelper from "./enum-helper";

export abstract class CategoryHelper {
    public static asString(categoryId: number) : string {
        switch (categoryId) {
          case 9:
            return EnumHelper.propertyEnumToString(PropertyType.COMMERCIAL);
          case 7:
            return EnumHelper.propertyEnumToString(PropertyType.HOUSE);
          case 8:
            return EnumHelper.propertyEnumToString(PropertyType.LAND);
          case 6:
            return EnumHelper.propertyEnumToString(PropertyType.APARTMENT);
          case 30:
            return EnumHelper.propertyEnumToString(PropertyType.NEW_BUILDING);
          default:
            return 'Невідомо.';
        }
    }
}