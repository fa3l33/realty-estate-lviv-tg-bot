import { Menu } from "@grammyjs/menu";
import { RoomType } from "../../../dal/enums/room-type";
import Constants from "../constants";
import { getUserSession } from "../session-context";
import {
  buildCheckedMenu,
  PROPERTY_MENU,
  toggleRoomFlag,
  DISTRICT_MENU,
  ROOM_MENU,
  editFilterTextOnMenuClick,
} from "./menu-helper";

export const roomMenu: Menu = new Menu(ROOM_MENU)
    .text(
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        return buildCheckedMenu(Constants.ONE, userSession.roomType, RoomType.ONE);
      },      
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        toggleRoomFlag(userSession, RoomType.ONE);
        await ctx.menu.update({immediate: true});
        editFilterTextOnMenuClick(ctx, userSession, roomMenu);
      }
    )
    .text(
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        return buildCheckedMenu(Constants.TWO, userSession.roomType, RoomType.TWO);
      },      
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        toggleRoomFlag(userSession, RoomType.TWO);
        await ctx.menu.update({immediate: true});
        editFilterTextOnMenuClick(ctx, userSession, roomMenu);
      }
    )
    .row()
    .text(
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        return buildCheckedMenu(Constants.THREE, userSession.roomType, RoomType.THREE);
      },      
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        toggleRoomFlag(userSession, RoomType.THREE);
        await ctx.menu.update({immediate: true});
        editFilterTextOnMenuClick(ctx, userSession, roomMenu);
      }
    )
    .text(
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        return buildCheckedMenu(Constants.FOUR_OR_MORE, userSession.roomType, RoomType.FOUR_OR_MORE);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        toggleRoomFlag(userSession, RoomType.FOUR_OR_MORE);
        await ctx.menu.update({immediate: true});
        editFilterTextOnMenuClick(ctx, userSession, roomMenu);
      }
    )
    .row()
    .back(Constants.BACK,  async (ctx) => {
      ctx.menu.nav(PROPERTY_MENU);
    })
    .text(Constants.NEXT, async (ctx) => {
      ctx.menu.nav(DISTRICT_MENU);
    });
