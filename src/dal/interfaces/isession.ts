import { PriceType } from '../enums/tg/price-type';
import { MenuStep } from '../enums/tg/menu-step-type';
import { DistrictType } from '../enums/tg/district-type';
import { RoomType } from '../enums/tg/room-type';
import { PropertyType } from '../enums/tg/property-type';
import { ApartmentPriceType } from '../enums/tg/apartment-price-type';

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
}