import { ApartmentPriceType } from './../enums/apartment-price-type';
import { PriceType } from './../enums/price-type';
import { DistrictType } from "../enums/disctrict-type";
import { MenuStep } from "../enums/menu-step-type";
import { PropertyType } from "../enums/property-type";
import { RoomType } from "../enums/room-type";

export interface Session {
    propertyType: PropertyType,
    roomType: RoomType,
    districtType: DistrictType,
    menuStep: MenuStep,
    priceType: PriceType,
    apartmentPriceType: ApartmentPriceType,
    // determine if user wants to receive updates
    isActive: boolean,
    // time when user started to use bot
    startTS: Date,
    // last time filter was updated
    lastUpdateTS: Date,
    // last notification send date
    notifiedAtTS?: Date,
    // determines where to after property menu
    isRoomMenuVisited: boolean
}