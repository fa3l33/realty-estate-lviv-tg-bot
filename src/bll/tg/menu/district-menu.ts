import { Menu } from "@grammyjs/menu";
import { DistrictType } from "../../../dal/enums/disctrict-type";

import { PropertyType } from "../../../dal/enums/property-type";
import { hasFlag } from "../../../common/enum-utils";
import { getUserSession } from "../session-context";
import {
  BACK,
  buildCheckedMenu,
  PROPERTY_MENU,
  ROOM_MENU,
  TAVRICHESK,
  CENTER,
  ZHILPOSELOK,
  OSTROV,
  READY,
  SHUMENSKIY,
  HBK,
  toggleDistrictFlag,
  DISTRICT_MENU,
  editFilterTextOnMenuClick,
} from "./menu-helper";

export const districtMenu: Menu = new Menu(DISTRICT_MENU)
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        TAVRICHESK,
        userSession.districtType,
        DistrictType.TAVRICHESK
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.TAVRICHESK);      
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        ZHILPOSELOK,
        userSession.districtType,
        DistrictType.ZHILPOSELOK
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.ZHILPOSELOK);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        SHUMENSKIY,
        userSession.districtType,
        DistrictType.SHUMENSKIY
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.SHUMENSKIY);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        CENTER,
        userSession.districtType,
        DistrictType.CENTER
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.CENTER);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .row()
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        OSTROV,
        userSession.districtType,
        DistrictType.OSTROV
      );
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.OSTROV);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(HBK, userSession.districtType, DistrictType.HBK);
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.HBK);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .row()
  .text(BACK, async (ctx) => {
    let userSession = await getUserSession(ctx);

    if (
      hasFlag(userSession.propertyType, PropertyType.APARTMENT) ||
      hasFlag(userSession.propertyType, PropertyType.NEW_BUILDING)
    ) {
      ctx.menu.nav(ROOM_MENU);
    } else {
        ctx.menu.nav(PROPERTY_MENU);
    }
  })
  .text(READY, (ctx) => {
    ctx.menu.close();
  });
