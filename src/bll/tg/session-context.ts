import { Context, LazySessionFlavor } from 'grammy';
import { DistrictType } from '../../dal/enums/disctrict-type';
import { MenuStep } from '../../dal/enums/menu-step-type';
import { PropertyType } from '../../dal/enums/property-type';
import { RoomType } from '../../dal/enums/room-type';
import BotSession from '../../dal/interfaces/bot-session.interface';

export function initialize(): BotSession {
  return {
    id: 0,
    isBot: false,
    firstName: "",
    lastName: undefined,
    propertyType: PropertyType.NONE,
    roomType: RoomType.NONE,
    districtType: DistrictType.NONE,
    menuStep: MenuStep.PROPERTY,
    isActive: true,
    startTS: Date.now(),
    lastUpdateTS: Date.now(),
    notifiedAtTS: undefined
  };
}

export type SessionContextFlavor = Context & LazySessionFlavor<BotSession>;
