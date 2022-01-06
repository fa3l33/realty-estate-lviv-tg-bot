import { Context, LazySessionFlavor } from 'grammy';
import { Chat, User } from 'grammy/out/platform.node';
import { ApartmentPriceType } from '../../dal/enums/apartment-price-type';
import { DistrictType } from '../../dal/enums/disctrict-type';
import { MenuStep } from '../../dal/enums/menu-step-type';
import { PriceType } from '../../dal/enums/price-type';
import { PropertyType } from '../../dal/enums/property-type';
import { RoomType } from '../../dal/enums/room-type';
import BotSession from '../../dal/interfaces/bot-session.interface';

export function initialize(): BotSession {
  return {
    id: 0,
    isBot: false,
    firstName: '',
    lastName: undefined,
    propertyType: PropertyType.NONE,
    roomType: RoomType.NONE,
    districtType: DistrictType.NONE,
    priceType: PriceType.NONE,
    apartmentPriceType: ApartmentPriceType.NONE,
    menuStep: MenuStep.PROPERTY,
    isActive: true,
    startTS: new Date(),
    lastUpdateTS: new Date(),
    notifiedAtTS: undefined,
    phoneNumber: undefined,
    chatId: 0
  };
}

export function mapFromToSession(userSession: BotSession, from: User | undefined, chat: Chat | undefined) {
  if (userSession !== undefined && from !== undefined && userSession.id !== from.id) {
      userSession.id = from.id;
      userSession.firstName = from.first_name;
      userSession.lastName = from.last_name;
      userSession.username = from?.username;
      userSession.isBot = from.is_bot;
      userSession.chatId = chat!.id
  }
}

export async function getUserSession(ctx: Context) : Promise<BotSession> {
  return (ctx as unknown as LazySessionFlavor<BotSession>).session;
}

export type SessionContextFlavor = Context & LazySessionFlavor<BotSession>;
