import { DistrictType } from "../enums/disctrict-type";
import { MenuStep } from "../enums/menu-step-type";
import { PropertyType } from "../enums/property-type";
import { RoomType } from "../enums/room-type";

export interface Session {
    propertyType: PropertyType,
    roomType: RoomType,
    districtType: DistrictType,
    menuStep: MenuStep,
    // determine if user wants to receive updates
    isActive: boolean,
    // time when user started to use bot
    startTS: number,
    // last time filter was updated
    lastUpdateTS: number,
    // last notification send date
    notifiedAtTS?: number,
    // determines where to after property menu
    isRoomMenuVisited: boolean
}