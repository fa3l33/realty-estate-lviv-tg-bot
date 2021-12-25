import { PriceType } from './../../../dal/enums/price-type';
import { Menu } from "@grammyjs/menu";
import { getUserSession } from "../session-context";
import {
  buildCheckedMenu,
  PROPERTY_MENU,
  ROOM_MENU,  
  PRICE_MENU,
  editFilterTextOnMenuClick,
  togglePriceFlag,
  toggleApartmentPriceFlag,
  DISTRICT_MENU,
} from "./menu-helper";
import Constants from "../constants";
import EnumHelper from "../../enum-helper";
import { ApartmentPriceType } from '../../../dal/enums/apartment-price-type';

export const priceMenu: Menu = new Menu(PRICE_MENU)
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);

       if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        return buildCheckedMenu(
            Constants.PRICES.FROM_20_TO_40,
            userSession.priceType,
            PriceType.FROM_20_TO_40
          ); 
       } else {
           return buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_20_TO_35,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_20_TO_35
           );
       }
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        togglePriceFlag(userSession, PriceType.FROM_20_TO_40);
      } else {
        toggleApartmentPriceFlag(userSession, ApartmentPriceType.FROM_20_TO_35);
      }

      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, priceMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);

       if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        return buildCheckedMenu(
            Constants.PRICES.FROM_40_TO_60,
            userSession.priceType,
            PriceType.FROM_40_TO_60
          ); 
       } else {
           return buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_35_TO_45,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_35_TO_45
           );
       }
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        togglePriceFlag(userSession, PriceType.FROM_40_TO_60);
      } else {
        toggleApartmentPriceFlag(userSession, ApartmentPriceType.FROM_35_TO_45);
      }

      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, priceMenu);
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);

       if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        return buildCheckedMenu(
            Constants.PRICES.FROM_60_TO_100,
            userSession.priceType,
            PriceType.FROM_60_TO_100
          ); 
       } else {
           return buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_35_TO_45,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_45_TO_60
           );
       }
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        togglePriceFlag(userSession, PriceType.FROM_60_TO_100);
      } else {
        toggleApartmentPriceFlag(userSession, ApartmentPriceType.FROM_45_TO_60);
      }

      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, priceMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);

       if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        return buildCheckedMenu(
            Constants.PRICES.FROM_100_AND_MORE,
            userSession.priceType,
            PriceType.FROM_100_AND_MORE
          ); 
       } else {
           return buildCheckedMenu(
            Constants.APARTMENT_PRICES.FROM_60_AND_MORE,
            userSession.apartmentPriceType,
            ApartmentPriceType.FROM_60_AND_MORE
           );
       }
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      if (EnumHelper.hasNonApartmentEnabled(userSession.propertyType)) {
        togglePriceFlag(userSession, PriceType.FROM_100_AND_MORE);
      } else {
        toggleApartmentPriceFlag(userSession, ApartmentPriceType.FROM_60_AND_MORE);
      }

      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, priceMenu);
    }
  )  
  .row()
  .text(Constants.BACK, async (ctx) => {
    let userSession = await getUserSession(ctx);

    if (EnumHelper.hasApartmentsEnabled(userSession.propertyType)) {
      ctx.menu.nav(ROOM_MENU);
    } else {
        ctx.menu.nav(PROPERTY_MENU);
    }
  })
  .text(Constants.NEXT, (ctx) => {
    ctx.menu.nav(DISTRICT_MENU);
  });
