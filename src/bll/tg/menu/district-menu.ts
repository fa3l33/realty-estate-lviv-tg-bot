import { MenuStep } from './../../../dal/enums/tg/menu-step-type';
import { DistrictType } from './../../../dal/enums/tg/district-type';
import { Api, Bot, RawApi, Keyboard } from 'grammy';
import BotSession from "../../../dal/interfaces/bot-session.interface";
import Constants from '../constants';
import { buildCheckedMenu, toggleDistrictFlag } from './menu-helper';
import IMenu from './menu.interface';
import { getUserSession, SessionContextFlavor } from '../session-context';
import { addChecked } from '../../emoji';
import Menu from './menu';

export class DistrictMenu extends Menu implements IMenu {
  getMenu(userSession: BotSession): Keyboard {
    return new Keyboard()
    .text(
      buildCheckedMenu(
        Constants.TAVRICHESK,
        userSession.districtType,
        DistrictType.TAVRICHESK
      )
    )
    .text(
      buildCheckedMenu(
        Constants.CENTER,
        userSession.districtType,
        DistrictType.CENTER
      )
    )
    .row()
    .text(
      buildCheckedMenu(
        Constants.ZHILPOSELOK,
        userSession.districtType,
        DistrictType.ZHILPOSELOK
      )
    )
    .text(
      buildCheckedMenu(
        Constants.OSTROV,
        userSession.districtType,
        DistrictType.OSTROV
      )
    )
    .row()
    .text(
      buildCheckedMenu(
        Constants.SHUMENSKIY,
        userSession.districtType,
        DistrictType.SHUMENSKIY
      )
    )
    .text(
      buildCheckedMenu(
        Constants.HBK,
        userSession.districtType,
        DistrictType.HBK
      )
    )
    .row()
    .text(Constants.BACK)
    .text(Constants.READY);
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void{
    bot.on("message:text").filter(
      (ctx) => {
        return [
          Constants.TAVRICHESK,
          Constants.CENTER,
          Constants.ZHILPOSELOK,
          Constants.OSTROV,
          Constants.SHUMENSKIY,
          Constants.HBK,
          addChecked(Constants.TAVRICHESK),
          addChecked(Constants.CENTER),
          addChecked(Constants.ZHILPOSELOK),
          addChecked(Constants.OSTROV),
          addChecked(Constants.SHUMENSKIY),
          addChecked(Constants.HBK),
        ].includes(ctx.message.text);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.menuStep = MenuStep.DISTRICT;
  
        let TAVRICHESK_CHECKED = addChecked(Constants.TAVRICHESK);
        let CENTER_CHECKED = addChecked(Constants.CENTER);
        let ZHILPOSELOK_CHECKED = addChecked(Constants.ZHILPOSELOK);
        let OSTROV_CHECKED = addChecked(Constants.OSTROV);
        let SHUMENSKIY_CHECKED = addChecked(Constants.SHUMENSKIY);
        let HBK_CHECKED = addChecked(Constants.HBK);
  
        switch (ctx.message.text) {
          case Constants.TAVRICHESK:
          case TAVRICHESK_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.TAVRICHESK);
            break;
          case Constants.CENTER:
          case CENTER_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.CENTER);
            break;
          case Constants.ZHILPOSELOK:
          case ZHILPOSELOK_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.ZHILPOSELOK);
            break;
          case Constants.OSTROV:
          case OSTROV_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.OSTROV);
            break;
          case Constants.SHUMENSKIY:
          case SHUMENSKIY_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.SHUMENSKIY);
            break;
          case Constants.HBK:
          case HBK_CHECKED:
            toggleDistrictFlag(userSession, DistrictType.HBK);
            break;
        }
  
        this.sendMenu(ctx, this.getMenu(userSession));
      }
    );  
  }
}