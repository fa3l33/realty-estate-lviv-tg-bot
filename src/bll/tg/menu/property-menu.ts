import { MenuStep } from './../../../dal/enums/tg/menu-step-type';
import { PropertyType } from './../../../dal/enums/tg/property-type';
import { Api, Bot, Keyboard, RawApi } from "grammy";
import BotSession from "../../../dal/interfaces/bot-session.interface";
import Constants from "../constants";
import { buildCheckedMenu, togglePropertyFlag } from "./menu-helper";
import IMenu from "./menu.interface";
import { getUserSession, SessionContextFlavor } from "../session-context";
import { addChecked } from "../../emoji";
import Menu from "./menu";

export default class PropertyMenu extends Menu implements IMenu {
  getMenu(userSession: BotSession): Keyboard {
    userSession.menuStep = MenuStep.PROPERTY;
      
    return new Keyboard()
      .text(
        buildCheckedMenu(
          Constants.NEW_BUILDING,
          userSession.propertyType,
          PropertyType.NEW_BUILDING
        )
      )
      .text(
        buildCheckedMenu(
          Constants.APARTMENT,
          userSession.propertyType,
          PropertyType.APARTMENT
        )
      )
      .row()
      .text(
        buildCheckedMenu(
          Constants.HOUSE,
          userSession.propertyType,
          PropertyType.HOUSE
        )
      )
      .text(
        buildCheckedMenu(
          Constants.LAND,
          userSession.propertyType,
          PropertyType.LAND
        )
      )
      .row()
      .text(
        buildCheckedMenu(
          Constants.COMMERCIAL,
          userSession.propertyType,
          PropertyType.COMMERCIAL
        )
      )
      .row()
      .text(Constants.NEXT);
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void {
    bot.on("message:text").filter(
      (ctx) => {
        return [
          Constants.NEW_BUILDING,
          Constants.APARTMENT,
          Constants.HOUSE,
          Constants.LAND,
          Constants.COMMERCIAL,
          addChecked(Constants.NEW_BUILDING),
          addChecked(Constants.APARTMENT),
          addChecked(Constants.HOUSE),
          addChecked(Constants.LAND),
          addChecked(Constants.COMMERCIAL),
        ].includes(ctx.message.text);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.menuStep = MenuStep.PROPERTY;

        let NEW_BUILDING_CHECKED = addChecked(Constants.NEW_BUILDING);
        let APARTMENT_CHECKED = addChecked(Constants.APARTMENT);
        let HOUSE_CHECKED = addChecked(Constants.HOUSE);
        let LAND_CHECKED = addChecked(Constants.LAND);
        let COMMERCIAL_CHECKED = addChecked(Constants.COMMERCIAL);

        switch (ctx.message.text) {
          case Constants.NEW_BUILDING:
          case NEW_BUILDING_CHECKED:
            togglePropertyFlag(userSession, PropertyType.NEW_BUILDING);
            break;
          case Constants.APARTMENT:
          case APARTMENT_CHECKED:
            togglePropertyFlag(userSession, PropertyType.APARTMENT);
            break;
          case Constants.HOUSE:
          case HOUSE_CHECKED:
            togglePropertyFlag(userSession, PropertyType.HOUSE);
            break;
          case Constants.LAND:
          case LAND_CHECKED:
            togglePropertyFlag(userSession, PropertyType.LAND);
            break;
          case Constants.COMMERCIAL:
          case COMMERCIAL_CHECKED:
            togglePropertyFlag(userSession, PropertyType.COMMERCIAL);
            break;
        }

        this.sendMenu(ctx, this.getMenu(userSession));
      }
    );
  }
}
