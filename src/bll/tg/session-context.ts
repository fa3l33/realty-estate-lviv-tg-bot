import { MenuStep } from './../../dal/enums/tg/menu-step-type';
import { PriceType } from './../../dal/enums/tg/price-type';
import { DistrictType } from '../../dal/enums/tg/district-type';
import { RoomType } from './../../dal/enums/tg/room-type';
import { PropertyType } from './../../dal/enums/tg/property-type';
import { Context, LazySessionFlavor } from 'grammy';
import { Chat, User } from 'grammy/out/platform.node';
import { ApartmentPriceType } from '../../dal/enums/tg/apartment-price-type';
import BotSession from '../../dal/interfaces/bot-session.interface';

export function initialize(): BotSession {
  return {
    id: 0,
    isBot: false,
    firstName: '',
    lastName: '',
    username: '',
    propertyType: PropertyType.NONE,
    roomType: RoomType.NONE,
    districtType: DistrictType.NONE,
    priceType: PriceType.NONE,
    apartmentPriceType: ApartmentPriceType.NONE,
    menuStep: MenuStep.PROPERTY,
    isActive: false,
    startTS: new Date(),
    lastUpdateTS: new Date(),
    notifiedAtTS: undefined,
    phoneNumber: undefined,
    chatId: 0,
    itemIds: []
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
