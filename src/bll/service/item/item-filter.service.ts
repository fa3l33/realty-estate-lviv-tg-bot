import { DealType } from '../../../dal/enums/rg_zoo/deal-type';
import { PriceType } from '../../../dal/enums/tg/price-type';
import { DistrictType } from '../../../dal/enums/tg/district-type';
import { RoomType } from '../../../dal/enums/tg/room-type';
import { PropertyType } from '../../../dal/enums/tg/property-type';
import { ApartmentPriceType } from "../../../dal/enums/tg/apartment-price-type";
import { Item } from "../../../dal/model/rg_zoo/item";
import { hasFlag } from "../../../common/enum-utils";
import { User } from "../../../dal/model/tg/user";
import EnumHelper from "../../enum-helper";
import IItemFilterService from "./iitem-filter.service";
import { ItemElementType } from "../../../dal/enums/tg/item-elemnt-type";
import ElementParser from '../../elemens-parser';
import IUserService from '../user/iuser.service';

export default class ItemFilterService implements IItemFilterService {
  private readonly _userService: IUserService;

  constructor (userService: IUserService) {
    this._userService = userService;
  }

  byType(item: Item): boolean {
    const itemType = ElementParser.getOption(item.elements, ItemElementType.TYPE);

    if (itemType) {
      return itemType === DealType.SELL;
    }

    return true;
  }

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

      // if apartment selected include new buildings
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
      let roomsCount = ElementParser.getOption(item.elements, ItemElementType.ROOMS_COUNT);

      // if apartments not selected return all items
      if (!EnumHelper.hasApartmentsEnabled(user.propertyType)) return true;

      // nothing selected
      if (roomType === RoomType.NONE) return true;

      if (roomsCount) {
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

        if (selectedRooms.includes(Number(roomsCount))) return true;

        return false;
      } else {
        return true;
      }
    };
  }

  byPrice(user: User) {
    const self = this;

    return function (item: Item): boolean {
      let price = ElementParser.getOption(item.elements, ItemElementType.PRICE_USD);

      if (price) {
        if (EnumHelper.hasNonApartmentEnabled(user.propertyType)) {
          return self.filterByPrice(user.priceType, Number(price));
        } else {
          return self.filterByApartmentPrice(user.apartmentPriceType, Number(price));
        }
      } else {
        return true;
      }
    };
  }

  byDistrict(user: User) : (item: Item) => boolean {
    const districtType = user.districtType;

    return function (item: Item): boolean {
      let district = ElementParser.getOption(item.elements, ItemElementType.DISTRICT);

      if (district) {
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

  bySeenItems(user: User) {
    const self = this;

    return function (item: Item): Promise<boolean> {
      return self._userService.getSeenItemsIdById(user.id).then((userAndItemsId) => {
        if (userAndItemsId !== undefined) {
          return userAndItemsId.items.length == 0 || !userAndItemsId.items.map(it => it.id).includes(item.id);
        }

        return false;
      });
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
