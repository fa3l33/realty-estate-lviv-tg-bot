import { Context, LazySessionFlavor } from 'grammy';
import { User } from 'grammy/out/platform.node';
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
    notifiedAtTS: undefined,
    isRoomMenuVisited: false
  };
}

export function mapFromToSession(userSession: BotSession, from: User | undefined) {
  if (userSession !== undefined && from !== undefined && userSession.id !== from.id) {
      userSession.id = from.id;
      userSession.firstName = from.first_name;
      userSession.lastName = from.last_name;
      userSession.username = from?.username;
      userSession.isBot = from.is_bot;
  }
}

export async function getUserSession(ctx: Context) : Promise<BotSession> {
  return (ctx as unknown as LazySessionFlavor<BotSession>).session;
}

export type SessionContextFlavor = Context & LazySessionFlavor<BotSession>;
