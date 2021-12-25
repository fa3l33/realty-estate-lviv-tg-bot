import { Menu } from "@grammyjs/menu";
import { DistrictType } from "../../../dal/enums/disctrict-type";
import { getUserSession } from "../session-context";
import {
  buildCheckedMenu,
  toggleDistrictFlag,
  DISTRICT_MENU,
  editFilterTextOnMenuClick,
  PRICE_MENU,
} from "./menu-helper";
import Constants from "../constants";

export const districtMenu: Menu = new Menu(DISTRICT_MENU)
  .text(
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      return buildCheckedMenu(
        Constants.TAVRICHESK,
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
        Constants.ZHILPOSELOK,
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
        Constants.SHUMENSKIY,
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
        Constants.CENTER,
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
        Constants.OSTROV,
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
      return buildCheckedMenu(Constants.HBK, userSession.districtType, DistrictType.HBK);
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      toggleDistrictFlag(userSession, DistrictType.HBK);
      await ctx.menu.update({immediate: true});
      editFilterTextOnMenuClick(ctx, userSession, districtMenu);
    }
  )
  .row()
  .back(Constants.BACK, async (ctx) => {
      ctx.menu.nav(PRICE_MENU);
  })
  .text(Constants.READY, (ctx) => {
    ctx.menu.close();
  });
