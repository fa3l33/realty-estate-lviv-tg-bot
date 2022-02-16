import { PriceType } from '../../../dal/enums/tg/price-type';
import { DistrictType } from '../../../dal/enums/tg/district-type';
import { RoomType } from '../../../dal/enums/tg/room-type';
import { PropertyType } from '../../../dal/enums/tg/property-type';
import { ApartmentPriceType } from "../../../dal/enums/tg/apartment-price-type";
import { hasFlag } from "../../../common/enum-utils";
import { User } from "../../../dal/model/tg/user";
import EnumHelper from "../../enum-helper";
import IItemFilterService from "./iitem-filter.service";
import IUserService from '../user/iuser.service';
import Constants from '../../tg/constants';
import LigaProItemDTO from '../../dto/liga-pro-item.dto';
import logger from '../../logger';

export default class ItemFilterService implements IItemFilterService {
  private readonly _userService: IUserService;

  constructor (userService: IUserService) {
    this._userService = userService;
  }

  byType(item: LigaProItemDTO): boolean {
    const itemType = item.getType();

    if (itemType) {
      return itemType === Constants.LIGA_PRO.TYPE.SALE;
    }

    return true;
  }

  byProperty(user: User) : (item: LigaProItemDTO) => boolean {
    const propertyType = user.propertyType;

    return function (item: LigaProItemDTO): boolean {
      // interested in all
      if (propertyType === PropertyType.NONE) return true;

      let itemCategory = item.getCategory();
      if (
        hasFlag(propertyType, PropertyType.NEW_BUILDING) &&
        itemCategory === Constants.LIGA_PRO.CATEGORY.APARTMENT  // should be NEW_BUILDING
      )
        return true;

      // if apartment selected include new buildings
      if (
        hasFlag(propertyType, PropertyType.APARTMENT) &&
        itemCategory === Constants.LIGA_PRO.CATEGORY.APARTMENT
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.HOUSE) &&
        itemCategory === Constants.LIGA_PRO.CATEGORY.HOUSE
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.LAND) &&
        itemCategory === Constants.LIGA_PRO.CATEGORY.LAND
      )
        return true;

      if (
        hasFlag(propertyType, PropertyType.COMMERCIAL) &&
        itemCategory === Constants.LIGA_PRO.CATEGORY.COMMERCIAL
      )
        return true;

      return false;
    };
  }

  byRoomsCount(user: User) : (item: LigaProItemDTO) => boolean {
    const roomType: RoomType = user.roomType;
    let selectedRooms: Array<number> = [];

    return function (item: LigaProItemDTO): boolean {
      let roomsCount = item.getRoomsCount();

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

  byPrice(user: User) : (item: LigaProItemDTO) => boolean {
    const self = this;

    return function (item: LigaProItemDTO): boolean {
      let price = item.getPriceUSD();

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

  byDistrict(user: User) : (item: LigaProItemDTO) => boolean {
    const districtType = user.districtType;

  return function (item: LigaProItemDTO): boolean {
      let district: string = item.getSubLocalityName();
      
      if (district) {
        if (districtType === DistrictType.NONE) return true;

        if (
          hasFlag(districtType, DistrictType.VOENKA) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.VOENKA
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.VOSTOCHNIY) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.VOSTOCHNIY
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.KINDIYKA) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.KINDIYKA
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.STEKLOTARA) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.STEKLOTARA
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.TEKSTILNIY) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.TEKSTILNIY
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.HBK) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.HBK
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.ZHILMASIV) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.ZHILMASIV
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.ZHILPOSELOK) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.ZHILPOSELOK
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.ZABALKA) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.ZABALKA
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.NEFTEGAVAN) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.NEFTEGAVAN
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.OSTROV) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.OSTROV
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.PORT) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.PORT
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.PORT_ELEVATOR) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.PORT_ELEVATOR
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.PRIVOKZALNIY) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.PRIVOKZALNIY
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.SHUMSKIY) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.SHUMSKIY
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.MELNIZA) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.MELNIZA
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.SEVERNIY) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.SEVERNIY
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.CENTR) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.CENTR
        )
          return true;

        if (
          hasFlag(districtType, DistrictType.TAVRICHESK) &&
          district === Constants.LIGA_PRO.SUB_DISTRICT.TAVRICHESK
        )
          return true;
      } else {
        return true;
      }

      return false;
    };
  }

  bySeenItems(user: User) : (item: LigaProItemDTO) => Promise<boolean> {
    const self = this;

    return function (item: LigaProItemDTO): Promise<boolean> {
      return self._userService.getByIdWithSeenItemIds(user.id).then((userAndItemsId) => {
        if (userAndItemsId !== undefined) {
          return userAndItemsId.itemIds.length == 0 || !userAndItemsId.itemIds.includes(Number.parseInt(item.getInternalId()));
        }

        return false;
      }).catch((error) => {
        logger.error(error, 'Unable to get user item ids.');
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
      price < 35000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_35_TO_45) &&
      price >= 35000 &&
      price < 45000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_45_TO_60) &&
      price >= 45000 &&
      price < 60000
    )
      return true;
    if (
      hasFlag(apartmentPriceType, ApartmentPriceType.FROM_60_AND_MORE) &&
      price >= 60000
    )
      return true;

    return false;
  }
}
