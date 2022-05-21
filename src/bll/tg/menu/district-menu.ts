import { MenuStep } from "./../../../dal/enums/tg/menu-step-type";
import { DistrictType } from "./../../../dal/enums/tg/district-type";
import { Api, Bot, RawApi, Keyboard } from "grammy";
import BotSession from "../../../dal/interfaces/bot-session.interface";
import Constants from "../constants";
import { buildCheckedMenu, toggleDistrictFlag } from "./menu-helper";
import IMenu from "./menu.interface";
import { getUserSession, SessionContextFlavor } from "../session-context";
import { addChecked } from "../../emoji";
import Menu from "./menu";

export class DistrictMenu extends Menu implements IMenu {
  private readonly CHECKED_VOENKA = addChecked(Constants.SUB_DISTRICT.VOENKA);
  private readonly CHECKED_VOSTOCHNIY = addChecked(
    Constants.SUB_DISTRICT.VOSTOCHNIY
  );
  private readonly CHECKED_KINDIYKA = addChecked(
    Constants.SUB_DISTRICT.KINDIYKA
  );
  private readonly CHECKED_STEKLOTARA = addChecked(
    Constants.SUB_DISTRICT.STEKLOTARA
  );
  private readonly CHECKED_TEKSTILNIY = addChecked(
    Constants.SUB_DISTRICT.TEKSTILNIY
  );
  private readonly CHECKED_HBK = addChecked(Constants.SUB_DISTRICT.HBK);
  private readonly CHECKED_ZHILMASIV = addChecked(
    Constants.SUB_DISTRICT.ZHILMASIV
  );
  private readonly CHECKED_ZHILPOSELOK = addChecked(
    Constants.SUB_DISTRICT.ZHILPOSELOK
  );
  private readonly CHECKED_ZABALKA = addChecked(Constants.SUB_DISTRICT.ZABALKA);
  private readonly CHECKED_NEFTEGAVAN = addChecked(
    Constants.SUB_DISTRICT.NEFTEGAVAN
  );
  private readonly CHECKED_OSTROV = addChecked(Constants.SUB_DISTRICT.OSTROV);
  private readonly CHECKED_PORT_ELEVATOR = addChecked(
    Constants.SUB_DISTRICT.PORT_ELEVATOR
  );
  private readonly CHECKED_PRIVOKZALNIY = addChecked(
    Constants.SUB_DISTRICT.PRIVOKZALNIY
  );
  private readonly CHECKED_SHUMENSKIY = addChecked(
    Constants.SUB_DISTRICT.SHUMENSKIY
  );
  private readonly CHECKED_MELNIZA = addChecked(Constants.SUB_DISTRICT.MELNIZA);
  private readonly CHECKED_SEVERNIY_TAVRICHESK = addChecked(
    Constants.SUB_DISTRICT.SEVERNIY_TAVRICHESK
  );
  private readonly CHECKED_CENTR = addChecked(Constants.SUB_DISTRICT.CENTR);

  getMenu(userSession: BotSession): Keyboard {
    userSession.menuStep = MenuStep.DISTRICT;
    return new Keyboard()
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.VOENKA,
          userSession.districtType,
          DistrictType.VOENKA
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.VOSTOCHNIY,
          userSession.districtType,
          DistrictType.VOSTOCHNIY
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.KINDIYKA,
          userSession.districtType,
          DistrictType.KINDIYKA
        )
      )
      .row()
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.STEKLOTARA,
          userSession.districtType,
          DistrictType.STEKLOTARA
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.TEKSTILNIY,
          userSession.districtType,
          DistrictType.TEKSTILNIY
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.HBK,
          userSession.districtType,
          DistrictType.HBK
        )
      )
      .row()
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.ZHILPOSELOK,
          userSession.districtType,
          DistrictType.ZHILPOSELOK
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.ZABALKA,
          userSession.districtType,
          DistrictType.ZABALKA
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.NEFTEGAVAN,
          userSession.districtType,
          DistrictType.NEFTEGAVAN
        )
      )
      .row()      
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.OSTROV,
          userSession.districtType,
          DistrictType.OSTROV
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.SHUMENSKIY,
          userSession.districtType,
          DistrictType.SHUMENSKIY
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.ZHILMASIV,
          userSession.districtType,
          DistrictType.ZHILMASIV
        )
      )      
      .row()
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.MELNIZA,
          userSession.districtType,
          DistrictType.MELNIZA
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.CENTR,
          userSession.districtType,
          DistrictType.CENTR
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.PRIVOKZALNIY,
          userSession.districtType,
          DistrictType.PRIVOKZALNIY
        )
      )
      .row()
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.PORT_ELEVATOR,
          userSession.districtType,
          DistrictType.PORT_ELEVATOR
        )
      )
      .text(
        buildCheckedMenu(
          Constants.SUB_DISTRICT.SEVERNIY_TAVRICHESK,
          userSession.districtType,
          DistrictType.SEVERNIY_TAVRICHESK
        )
      )
      .row()
      .text(Constants.BACK)
      .text(Constants.READY);
  }

  addListener(bot: Bot<SessionContextFlavor, Api<RawApi>>): void {
    bot.on("message:text").filter(
      (ctx) => {
        return [
          Constants.SUB_DISTRICT.VOENKA,
          Constants.SUB_DISTRICT.VOSTOCHNIY,
          Constants.SUB_DISTRICT.KINDIYKA,
          Constants.SUB_DISTRICT.STEKLOTARA,
          Constants.SUB_DISTRICT.TEKSTILNIY,
          Constants.SUB_DISTRICT.HBK,
          Constants.SUB_DISTRICT.ZHILMASIV,
          Constants.SUB_DISTRICT.ZHILPOSELOK,
          Constants.SUB_DISTRICT.ZABALKA,
          Constants.SUB_DISTRICT.NEFTEGAVAN,
          Constants.SUB_DISTRICT.OSTROV,
          Constants.SUB_DISTRICT.PORT_ELEVATOR,
          Constants.SUB_DISTRICT.PRIVOKZALNIY,
          Constants.SUB_DISTRICT.SHUMENSKIY,
          Constants.SUB_DISTRICT.MELNIZA,
          Constants.SUB_DISTRICT.SEVERNIY_TAVRICHESK,
          Constants.SUB_DISTRICT.CENTR,
          this.CHECKED_VOENKA,
          this.CHECKED_VOSTOCHNIY,
          this.CHECKED_KINDIYKA,
          this.CHECKED_STEKLOTARA,
          this.CHECKED_TEKSTILNIY,
          this.CHECKED_HBK,
          this.CHECKED_ZHILMASIV,
          this.CHECKED_ZHILPOSELOK,
          this.CHECKED_ZABALKA,
          this.CHECKED_NEFTEGAVAN,
          this.CHECKED_OSTROV,
          this.CHECKED_PORT_ELEVATOR,
          this.CHECKED_PRIVOKZALNIY,
          this.CHECKED_SHUMENSKIY,
          this.CHECKED_MELNIZA,
          this.CHECKED_SEVERNIY_TAVRICHESK,
          this.CHECKED_CENTR,
        ].includes(ctx.message.text);
      },
      async (ctx) => {
        let userSession = await getUserSession(ctx);
        userSession.menuStep = MenuStep.DISTRICT;

        switch (ctx.message.text) {
          case Constants.SUB_DISTRICT.VOENKA:
          case this.CHECKED_VOENKA:
            toggleDistrictFlag(userSession, DistrictType.VOENKA);
            break;
          case Constants.SUB_DISTRICT.VOSTOCHNIY:
          case this.CHECKED_VOSTOCHNIY:
            toggleDistrictFlag(userSession, DistrictType.VOSTOCHNIY);
            break;
          case Constants.SUB_DISTRICT.KINDIYKA:
          case this.CHECKED_KINDIYKA:
            toggleDistrictFlag(userSession, DistrictType.KINDIYKA);
            break;
          case Constants.SUB_DISTRICT.STEKLOTARA:
          case this.CHECKED_STEKLOTARA:
            toggleDistrictFlag(userSession, DistrictType.STEKLOTARA);
            break;
          case Constants.SUB_DISTRICT.TEKSTILNIY:
          case this.CHECKED_TEKSTILNIY:
            toggleDistrictFlag(userSession, DistrictType.TEKSTILNIY);
            break;
          case Constants.SUB_DISTRICT.HBK:
          case this.CHECKED_HBK:
            toggleDistrictFlag(userSession, DistrictType.HBK);
            break;
          case Constants.SUB_DISTRICT.ZHILMASIV:
          case this.CHECKED_ZHILMASIV:
            toggleDistrictFlag(userSession, DistrictType.ZHILMASIV);
            break;
          case Constants.SUB_DISTRICT.ZHILPOSELOK:
          case this.CHECKED_ZHILPOSELOK:
            toggleDistrictFlag(userSession, DistrictType.ZHILPOSELOK);
            break;
          case Constants.SUB_DISTRICT.ZABALKA:
          case this.CHECKED_ZABALKA:
            toggleDistrictFlag(userSession, DistrictType.ZABALKA);
            break;
          case Constants.SUB_DISTRICT.NEFTEGAVAN:
          case this.CHECKED_NEFTEGAVAN:
            toggleDistrictFlag(userSession, DistrictType.NEFTEGAVAN);
            break;
          case Constants.SUB_DISTRICT.OSTROV:
          case this.CHECKED_OSTROV:
            toggleDistrictFlag(userSession, DistrictType.OSTROV);
            break;
          case Constants.SUB_DISTRICT.PORT_ELEVATOR:
          case this.CHECKED_PORT_ELEVATOR:
            toggleDistrictFlag(userSession, DistrictType.PORT_ELEVATOR);
            break;
          case Constants.SUB_DISTRICT.PRIVOKZALNIY:
          case this.CHECKED_PRIVOKZALNIY:
            toggleDistrictFlag(userSession, DistrictType.PRIVOKZALNIY);
            break;
          case Constants.SUB_DISTRICT.SHUMENSKIY:
          case this.CHECKED_SHUMENSKIY:
            toggleDistrictFlag(userSession, DistrictType.SHUMENSKIY);
            break;
          case Constants.SUB_DISTRICT.MELNIZA:
          case this.CHECKED_MELNIZA:
            toggleDistrictFlag(userSession, DistrictType.MELNIZA);
            break;
          case Constants.SUB_DISTRICT.SEVERNIY_TAVRICHESK:
          case this.CHECKED_SEVERNIY_TAVRICHESK:
            toggleDistrictFlag(userSession, DistrictType.SEVERNIY_TAVRICHESK);
            break;
          case Constants.SUB_DISTRICT.CENTR:
          case this.CHECKED_CENTR:
            toggleDistrictFlag(userSession, DistrictType.CENTR);
            break;
        }

        this.sendMenu(ctx, this.getMenu(userSession));
      }
    );
  }
}
