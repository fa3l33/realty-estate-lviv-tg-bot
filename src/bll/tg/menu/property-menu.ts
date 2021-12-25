import { Menu } from "@grammyjs/menu";
import { PropertyType } from "../../../dal/enums/property-type";
import {
  buildCheckedMenu,
  editFilterTextOnMenuClick,
  PRICE_MENU,
  PROPERTY_MENU,
  ROOM_MENU,
  togglePropertyFlag,
} from "./menu-helper";
import { getUserSession } from "../session-context";
import Constants from "../constants";
import EnumHelper from "../../enum-helper";

export const propertyMenu: Menu = new Menu(PROPERTY_MENU)
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      return buildCheckedMenu(
        Constants.NEW_BUILDING,
        userSession.propertyType,
        PropertyType.NEW_BUILDING
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.NEW_BUILDING);      
      // use eager menu updating to get rid of bad request error from TG
      // error happens because of menu updating twice for message and for by ctx.menu.update
      await ctx.menu.update({immediate: true });
      editFilterTextOnMenuClick(ctx, userSession, propertyMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        Constants.APARTMENT,
        userSession.propertyType,
        PropertyType.APARTMENT
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.APARTMENT);
      await ctx.menu.update({immediate: true });
      editFilterTextOnMenuClick(ctx, userSession, propertyMenu);
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        Constants.HOUSE,
        userSession.propertyType,
        PropertyType.HOUSE
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.HOUSE);
      await ctx.menu.update({immediate: true });
      editFilterTextOnMenuClick(ctx, userSession, propertyMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        Constants.LAND,
        userSession.propertyType,
        PropertyType.LAND
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.LAND);
      await ctx.menu.update({immediate: true });
      editFilterTextOnMenuClick(ctx, userSession, propertyMenu);
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        Constants.COMMERCIAL,
        userSession.propertyType,
        PropertyType.COMMERCIAL
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.COMMERCIAL);
      await ctx.menu.update({immediate: true });
      editFilterTextOnMenuClick(ctx, userSession, propertyMenu);
    }
  )
  .row()
  .text(Constants.NEXT, async (ctx) => {
    let userSession = await getUserSession(ctx);

    if (
      EnumHelper.hasApartmentsEnabled(userSession.propertyType)
    ) {
      ctx.menu.nav(ROOM_MENU);
    } else {
      ctx.menu.nav(PRICE_MENU);
    }
  });
