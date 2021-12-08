import { Menu } from "@grammyjs/menu";
import { PropertyType } from "../../../dal/enums/property-type";
import {
  APARTMENT,
  buildCheckedMenu,
  COMMERCIAL,
  DISTRICT_MENU,
  HOUSE,
  LAND,
  NEW_BUILDING,
  NEXT,
  PROPERTY_MENU,
  ROOM_MENU,
  togglePropertyFlag,
} from "./menu-helper";
import { getUserSession } from "../session-context";
import { hasFlag } from "../../common/enum-utils";

export const propertyMenu: Menu = new Menu(PROPERTY_MENU)
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        NEW_BUILDING,
        userSession.propertyType,
        PropertyType.NEW_BUILDING
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.NEW_BUILDING);

      ctx.menu.update();
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        APARTMENT,
        userSession.propertyType,
        PropertyType.APARTMENT
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.APARTMENT);

      ctx.menu.update();
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        HOUSE,
        userSession.propertyType,
        PropertyType.HOUSE
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.HOUSE);

      ctx.menu.update();
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        LAND,
        userSession.propertyType,
        PropertyType.LAND
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.LAND);

      ctx.menu.update();
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        COMMERCIAL,
        userSession.propertyType,
        PropertyType.COMMERCIAL
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      togglePropertyFlag(userSession, PropertyType.COMMERCIAL);

      ctx.menu.update();
    }
  )
  .row()
  .text(NEXT, async (ctx) => {
    let userSession = await getUserSession(ctx);

    if (
      hasFlag(userSession.propertyType, PropertyType.APARTMENT) ||
      hasFlag(userSession.propertyType, PropertyType.NEW_BUILDING)
    ) {
      ctx.menu.nav(ROOM_MENU);
    } else {
      ctx.menu.nav(DISTRICT_MENU);
    }
  });
