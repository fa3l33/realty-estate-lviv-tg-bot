import { DistrictType } from "../../dal/enums/disctrict-type";
import { ApartmentPriceType } from "../../dal/enums/apartment-price-type";
import { PriceType } from "../../dal/enums/price-type";
import { ItemElementMap } from "../../dal/item-element-map";
import { RoomType } from "../../dal/enums/room-type";
import { PropertyType } from "../../dal/enums/property-type";
import { Item } from "../../dal/model/rg_zoo/item";
import { hasFlag } from "../../common/enum-utils";
import { User } from "../../dal/model/tg/user";
import EnumHelper from "../enum-helper";
import { ItemElementType } from "../../dal/enums/item-elemnt-type";
import IItemFilter from "./item-filter.interface";

export default class ItemFilterService implements IItemFilter {
  byProperty(user: User) {
    const propertyType = user.propertyType;

    return function (item: Item): boolean {
      // interested in all
      if (propertyType === PropertyType.NONE) return true;

      if (
        hasFlag(propertyType, PropertyType.NEW_BUILDING) &&
        item.categories.find((ct) => ct.id === 30) !== null
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.APARTMENT) &&
        item.categories.find((ct) => ct.id === 30 || ct.id === 6)
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.HOUSE) &&
        item.categories.find((ct) => ct.id === 7)
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.LAND) &&
        item.categories.find((ct) => ct.id === 8)
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.COMMERCIAL) &&
        item.categories.find((ct) => ct.id === 9)
      )
        return true;

      return false;
    };
  }

  byRoomsCount(user: User) {
    const roomType: RoomType = user.roomType;
    let selectedRooms: Array<number> = [];

    return function (item: Item): boolean {
      let values: any = (item.elements as any)[
        ItemElementMap.get(ItemElementType.ROOMS_COUNT)!
      ];

      // if apartments not selected return all items
      if (!EnumHelper.hasApartmentsEnabled(user.propertyType)) return true;

      // nothing selected
      if (roomType === RoomType.NONE) return true;

      if (values && values[0] && values[0]["value"]) {
        const roomsCount = values[0]["value"] as number;

        if (hasFlag(roomType, RoomType.ONE)) selectedRooms.push(1);

        if (hasFlag(roomType, RoomType.TWO)) selectedRooms.push(2);

        if (hasFlag(roomType, RoomType.THREE)) selectedRooms.push(3);

        if (hasFlag(roomType, RoomType.FOUR_OR_MORE)) {
          selectedRooms.push(4);
          selectedRooms.push(5);
          selectedRooms.push(6);
          selectedRooms.push(7);
          selectedRooms.push(8);
        }

        if (selectedRooms.includes(roomsCount)) return true;

        return false;
      } else {
        return true;
      }
    };
  }

  byPrice(user: User) {
    const self = this;

    return function (item: Item): boolean {
      let values: any = (item.elements as any)[
        ItemElementMap.get(ItemElementType.PRICE_USD)!
      ];

      if (values && values[0] && values[0]["value"]) {
        let price = values[0]["value"] as number;

        if (EnumHelper.hasNonApartmentEnabled(user.propertyType)) {
          return self.filterByPrice(user.priceType, price);
        } else {
          return self.filterByApartmentPrice(user.apartmentPriceType, price);
        }
      } else {
        return true;
      }
    };
  }

  byDistrict(user: User) : (item: Item) => boolean {
    const districtType = user.districtType;

    return function (item: Item): boolean {
      let values: any = (item.elements as any)[
        ItemElementMap.get(ItemElementType.DISTRICT)!
      ];

      if (values && values[0] && values[0]["value"]) {
        let district = values[0]["value"] as string;

        if (districtType === DistrictType.NONE) return true;

        if (
          hasFlag(districtType, DistrictType.TAVRICHESK) &&
          district === "severnyj-tavricheskij"
        )
          return true;
        if (hasFlag(districtType, DistrictType.CENTER) && district === "centr")
          return true;
        if (
          hasFlag(districtType, DistrictType.ZHILPOSELOK) &&
          district === "zhilposelok"
        )
          return true;
        if (
          hasFlag(districtType, DistrictType.OSTROV) &&
          district === "ostrov-neftegavan"
        )
          return true;
        if (
          hasFlag(districtType, DistrictType.SHUMENSKIY) &&
          district === "shumenskij"
        )
          return true;
        if (
          hasFlag(districtType, DistrictType.HBK) &&
          district === "hbk-steklotara"
        )
          return true;
      } else {
        return true;
      }

      return false;
    };
  }

  private filterByPrice(priceType: PriceType, price: number) : boolean {
      // nothing selected
      if (priceType === PriceType.NONE) return true;
      if (hasFlag(priceType, PriceType.FROM_20_TO_40) && price < 40000)
        return true;
      if (
        hasFlag(priceType, PriceType.FROM_40_TO_60) &&
        price >= 40000 &&
        price < 60000
      )
        return true;
      if (
        hasFlag(priceType, PriceType.FROM_60_TO_100) &&
        price >= 60000 &&
        price < 100000
      )
        return true;
      if (
        hasFlag(priceType, PriceType.FROM_100_AND_MORE) &&
        price >= 100000
      )
        return true;
    
    return false;
  }

  private filterByApartmentPrice(apartmentPriceType: ApartmentPriceType, price: number) : boolean {
    if (apartmentPriceType === ApartmentPriceType.NONE) return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_20_TO_35) &&
      apartmentPriceType < 35000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_35_TO_45) &&
      apartmentPriceType >= 35000 &&
      apartmentPriceType < 45000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_45_TO_60) &&
      apartmentPriceType >= 45000 &&
      apartmentPriceType < 60000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_60_AND_MORE) &&
      apartmentPriceType >= 60000
    )
      return true;

    return false;
  }
}
