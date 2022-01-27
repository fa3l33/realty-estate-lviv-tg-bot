import { MenuStep } from './../../../dal/enums/tg/menu-step-type';
import { RoomType } from './../../../dal/enums/tg/room-type';
import { Api, Bot, Keyboard, RawApi } from 'grammy';
import Constants from "../constants";
import { buildCheckedMenu, toggleRoomFlag } from './menu-helper';
import BotSession from '../../../dal/interfaces/bot-session.interface';
import IMenu from './menu.interface';
import { getUserSession, SessionContextFlavor } from '../session-context';
import { addChecked } from '../../emoji';
import Menu from './menu';

export default class  RoomMenu extends Menu implements IMenu {
  getMenu(userSession: BotSession): Keyboard {
    return new Keyboard()
    .text(buildCheckedMenu(Constants.ONE, userSession.roomType, RoomType.ONE))
    .text(buildCheckedMenu(Constants.TWO, userSession.roomType, RoomType.TWO))
    .row()
    .text(
      buildCheckedMenu(Constants.THREE, userSession.roomType, RoomType.THREE)
    )
    .text(
      buildCheckedMenu(
        Constants.FOUR_OR_MORE,
        userSession.roomType,
        RoomType.FOUR_OR_MORE
      )
    )
    .row()
    .text(Constants.BACK)
    .text(Constants.NEXT);  
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void {
    bot.on("message:text").filter(
      (ctx) => {
        return [
          Constants.ONE,
          Constants.TWO,
          Constants.THREE,
          Constants.FOUR_OR_MORE,
          addChecked(Constants.ONE),
          addChecked(Constants.TWO),
          addChecked(Constants.THREE),
          addChecked(Constants.FOUR_OR_MORE),
        ].includes(ctx.message.text);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.menuStep = MenuStep.ROOM;
  
        let ONE_CHECKED = addChecked(Constants.ONE);
        let TWO_CHECKED = addChecked(Constants.TWO);
        let THREE_CHECKED = addChecked(Constants.THREE);
        let FOUR_OR_MORE_CHECKED = addChecked(Constants.FOUR_OR_MORE);
  
        switch (ctx.message.text) {
          case Constants.ONE:
          case ONE_CHECKED:
            toggleRoomFlag(userSession, RoomType.ONE);
            break;
          case Constants.TWO:
          case TWO_CHECKED:
            toggleRoomFlag(userSession, RoomType.TWO);
            break;
          case Constants.THREE:
          case THREE_CHECKED:
            toggleRoomFlag(userSession, RoomType.THREE);
            break;
          case Constants.FOUR_OR_MORE:
          case FOUR_OR_MORE_CHECKED:
            toggleRoomFlag(userSession, RoomType.FOUR_OR_MORE);
            break;
        }
  
        this.sendMenu(ctx, this.getMenu(userSession));
      });
  }
}
