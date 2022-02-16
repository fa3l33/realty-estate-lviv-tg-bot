import { MenuStep } from './../../../dal/enums/tg/menu-step-type';
import { PriceType } from './../../../dal/enums/tg/price-type';
import { ApartmentPriceType } from "../../../dal/enums/tg/apartment-price-type";
import { Api, Bot, Keyboard, RawApi } from "grammy";
import BotSession from "../../../dal/interfaces/bot-session.interface";
import EnumHelper from "../../enum-helper";
import Constants from "../constants";
import { buildCheckedMenu, toggleApartmentPriceFlag, togglePriceFlag } from "./menu-helper";
import IMenu from "./menu.interface";
import { getUserSession, SessionContextFlavor } from "../session-context";
import { addChecked } from "../../emoji";
import Menu from './menu';

export default class PriceMenu extends Menu implements IMenu {
  getMenu(userSession: BotSession): Keyboard {
    const keyboard = new Keyboard();
    userSession.menuStep = MenuStep.PRICE;

    if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
      keyboard.text(
        buildCheckedMenu(
          Constants.PRICES.FROM_20_TO_40,
          userSession.priceType,
          PriceType.FROM_20_TO_40
        )
      );

      keyboard
        .text(
          buildCheckedMenu(
            Constants.PRICES.FROM_40_TO_60,
            userSession.priceType,
            PriceType.FROM_40_TO_60
          )
        )
        .row();

      keyboard.text(
        buildCheckedMenu(
          Constants.PRICES.FROM_60_TO_100,
          userSession.priceType,
          PriceType.FROM_60_TO_100
        )
      );

      keyboard
        .text(
          buildCheckedMenu(
            Constants.PRICES.FROM_100_AND_MORE,
            userSession.priceType,
            PriceType.FROM_100_AND_MORE
          )
        )
        .row();
    } else {
      keyboard.text(
        buildCheckedMenu(
          Constants.APARTMENT_PRICES.FROM_20_TO_35,
          userSession.apartmentPriceType,
          ApartmentPriceType.FROM_20_TO_35
        )
      );

      keyboard
        .text(
          buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_35_TO_45,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_35_TO_45
          )
        )
        .row();

      keyboard.text(
        buildCheckedMenu(
          Constants.APARTMENT_PRICES.FROM_45_TO_60,
          userSession.apartmentPriceType,
          ApartmentPriceType.FROM_45_TO_60
        )
      );

      keyboard
        .text(
          buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_60_AND_MORE,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_60_AND_MORE
          )
        )
        .row();
    }

    keyboard.text(Constants.BACK).text(Constants.NEXT);
    return keyboard;
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void {
    bot.on("message:text").filter(
      (ctx) => {
        return [
          Constants.PRICES.FROM_20_TO_40,
          Constants.PRICES.FROM_40_TO_60,
          Constants.PRICES.FROM_60_TO_100,
          Constants.PRICES.FROM_100_AND_MORE,
          Constants.APARTMENT_PRICES.FROM_20_TO_35,
          Constants.APARTMENT_PRICES.FROM_35_TO_45,
          Constants.APARTMENT_PRICES.FROM_45_TO_60,
          Constants.APARTMENT_PRICES.FROM_60_AND_MORE,
          addChecked(Constants.PRICES.FROM_20_TO_40),
          addChecked(Constants.PRICES.FROM_40_TO_60),
          addChecked(Constants.PRICES.FROM_60_TO_100),
          addChecked(Constants.PRICES.FROM_100_AND_MORE),
          addChecked(Constants.APARTMENT_PRICES.FROM_20_TO_35),
          addChecked(Constants.APARTMENT_PRICES.FROM_35_TO_45),
          addChecked(Constants.APARTMENT_PRICES.FROM_45_TO_60),
          addChecked(Constants.APARTMENT_PRICES.FROM_60_AND_MORE),
        ].includes(ctx.message.text);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.menuStep = MenuStep.PRICE;
  
        let FROM_20_TO_40_CHECKED = addChecked(Constants.PRICES.FROM_20_TO_40);
        let FROM_40_TO_60_CHECKED = addChecked(Constants.PRICES.FROM_40_TO_60);
        let FROM_60_TO_100_CHECKED = addChecked(Constants.PRICES.FROM_60_TO_100);
        let FROM_100_AND_MORE_CHECKED = addChecked(
          Constants.PRICES.FROM_100_AND_MORE
        );
        let FROM_20_TO_35_CHECKED = addChecked(
          Constants.APARTMENT_PRICES.FROM_20_TO_35
        );
        let FROM_35_TO_45_CHECKED = addChecked(
          Constants.APARTMENT_PRICES.FROM_35_TO_45
        );
        let FROM_45_TO_60_CHECKED = addChecked(
          Constants.APARTMENT_PRICES.FROM_45_TO_60
        );
        let FROM_60_AND_MORE_CHECKED = addChecked(
          Constants.APARTMENT_PRICES.FROM_60_AND_MORE
        );
  
        switch (ctx.message.text) {
          case Constants.PRICES.FROM_20_TO_40:
          case FROM_20_TO_40_CHECKED:
            togglePriceFlag(userSession, PriceType.FROM_20_TO_40);
            break;
          case Constants.PRICES.FROM_40_TO_60:
          case FROM_40_TO_60_CHECKED:
            togglePriceFlag(userSession, PriceType.FROM_40_TO_60);
            break;
          case Constants.PRICES.FROM_60_TO_100:
          case FROM_60_TO_100_CHECKED:
            togglePriceFlag(userSession, PriceType.FROM_60_TO_100);
            break;
          case Constants.PRICES.FROM_100_AND_MORE:
          case FROM_100_AND_MORE_CHECKED:
            togglePriceFlag(userSession, PriceType.FROM_100_AND_MORE);
            break;
          case Constants.APARTMENT_PRICES.FROM_20_TO_35:
          case FROM_20_TO_35_CHECKED:
            toggleApartmentPriceFlag(
              userSession,
              ApartmentPriceType.FROM_20_TO_35
            );
            break;
          case Constants.APARTMENT_PRICES.FROM_35_TO_45:
          case FROM_35_TO_45_CHECKED:
            toggleApartmentPriceFlag(
              userSession,
              ApartmentPriceType.FROM_35_TO_45
            );
            break;
          case Constants.APARTMENT_PRICES.FROM_45_TO_60:
          case FROM_45_TO_60_CHECKED:
            toggleApartmentPriceFlag(
              userSession,
              ApartmentPriceType.FROM_45_TO_60
            );
            break;
          case Constants.APARTMENT_PRICES.FROM_60_AND_MORE:
          case FROM_60_AND_MORE_CHECKED:
            toggleApartmentPriceFlag(
              userSession,
              ApartmentPriceType.FROM_60_AND_MORE
            );
            break;
        }
  
        this.sendMenu(ctx, this.getMenu(userSession));
      }
    );
  }
}
