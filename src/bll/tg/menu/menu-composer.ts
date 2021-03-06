import { MenuStep } from './../../../dal/enums/tg/menu-step-type';
import { DistrictMenu } from './district-menu';
import { Api, Bot, Keyboard, RawApi } from "grammy";
import { getUserSession, SessionContextFlavor } from "./../session-context";
import { MessageBuilder } from "../message-builder";
import IMenu from "./menu.interface";
import Menu from "./menu";
import botSessionInterface from "../../../dal/interfaces/bot-session.interface";
import PriceMenu from './price-menu';
import PropertyMenu from './property-menu';
import RoomMenu from './room-menu';
import Constants from '../constants';
import EnumHelper from '../../enum-helper';
import INotificationService from '../../service/inotification.service';
import dayjs = require('dayjs');

export default class MenuComposer extends Menu implements IMenu {
  _menus: Array<IMenu>;
  private readonly _notificationService: INotificationService;

  constructor(notificationService: INotificationService) {
    super();

    this._notificationService = notificationService;

    this._menus = [
      new PropertyMenu(),
      new RoomMenu(),
      new PriceMenu(),
      new DistrictMenu(),
    ];  
  }

  async sendDefaultMenu(ctx: SessionContextFlavor) : Promise<void> {    
    var userSession = await getUserSession(ctx);
    this.sendMenu(ctx, this.getMenu(userSession));
  }

  getMenu(userSession: botSessionInterface): Keyboard {
    return this._menus[0].getMenu(userSession);
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void {
    this.registerBACK(bot);
    this.registerREADY(bot);
    this.registerNEXT(bot);

    this._menus.forEach(menu => {
      menu.addListener(bot);
    });
  }

  private registerBACK(bot: Bot<SessionContextFlavor, Api<RawApi>>) {
    bot.on("message:text").filter(
      (ctx) => {
        return ctx.message.text === Constants.BACK;
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);

        switch (userSession.menuStep) {
          case MenuStep.DISTRICT:
            userSession.menuStep = MenuStep.PRICE;
            this.sendMenu(
              ctx as SessionContextFlavor,
              this._menus[2].getMenu(userSession)
            );
            break;
          case MenuStep.PRICE:
            if (EnumHelper.hasApartmentsEnabled(userSession.propertyType)) {
              userSession.menuStep = MenuStep.ROOM;
              this.sendMenu(
                ctx as SessionContextFlavor,
                this._menus[1].getMenu(userSession)
              );
            } else {
              userSession.menuStep = MenuStep.PROPERTY;
              this.sendMenu(
                ctx as SessionContextFlavor,
                this._menus[0].getMenu(userSession)
              );
            }
            break;
          case MenuStep.ROOM:
            userSession.menuStep = MenuStep.PROPERTY;
            this.sendMenu(
              ctx as SessionContextFlavor,
              this._menus[0].getMenu(userSession)
            );
            break;
        }
      }
    );
  }

  private registerREADY(bot: Bot<SessionContextFlavor, Api<RawApi>>) {
    bot.on("message:text").filter(
      (ctx) => {
        return ctx.message.text === Constants.READY;
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.isActive = true;
        userSession.lastUpdateTS = new Date(Date.now());

        ctx.reply(MessageBuilder.buildFilter(userSession), {
          parse_mode: "HTML",
          reply_markup: {
            remove_keyboard: true,
          },
        });

        if (!userSession.notifiedAtTS) {
          // this._notificationService.notifyUser(dayjs('2020-01-01').subtract(180, 'day').unix(), userSession.id);
          this._notificationService.notifyUser(dayjs('2020-01-01').unix(), userSession.id);
        }
      }
    );
  }

  private registerNEXT(bot: Bot<SessionContextFlavor, Api<RawApi>>) {
    bot.on("message:text").filter(
      (ctx) => {
        return ctx.message.text === Constants.NEXT;
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
  
        switch (userSession.menuStep) {
          case MenuStep.PROPERTY:
            if (EnumHelper.hasApartmentsEnabled(userSession.propertyType)) {
              userSession.menuStep = MenuStep.ROOM;
              this.sendMenu(ctx as SessionContextFlavor, this._menus[1].getMenu(userSession));
            } else {
              userSession.menuStep = MenuStep.PRICE;
              this.sendMenu(ctx as SessionContextFlavor, this._menus[2].getMenu(userSession));
            }
            break;
          case MenuStep.ROOM:
            userSession.menuStep = MenuStep.PRICE;
            this.sendMenu(ctx as SessionContextFlavor, this._menus[2].getMenu(userSession));
            break;
          case MenuStep.PRICE:
            userSession.menuStep = MenuStep.DISTRICT;
            this.sendMenu(ctx as SessionContextFlavor, this._menus[3].getMenu(userSession));
            break;
        }
      }
    );
  }
}