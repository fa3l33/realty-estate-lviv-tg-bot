import { DistrictType } from "./../../../dal/enums/disctrict-type";
import { PriceType } from "./../../../dal/enums/price-type";
import { ApartmentPriceType } from "./../../../dal/enums/apartment-price-type";
import { RoomType } from "./../../../dal/enums/room-type";
import { Item } from "./../../../dal/model/rg_zoo/item";
import { PropertyType } from "./../../../dal/enums/property-type";
import { InlineKeyboard, Keyboard, Bot, RawApi, Api } from "grammy";
import config from "../../../config";
import Constants from "../constants";
import {
  buildCheckedMenu,
  toggleApartmentPriceFlag,
  toggleDistrictFlag,
  togglePriceFlag,
  togglePropertyFlag,
  toggleRoomFlag,
} from "../menu/menu-helper";
import { MessageBuilder } from "../message-builder";
import { getUserSession, SessionContextFlavor } from "./../session-context";
import { getRepository } from "typeorm";
import { MenuStep } from "../../../dal/enums/menu-step-type";
import EnumHelper from "../../enum-helper";
import { addChecked } from "../../emoji";
import BotSession from "../../../dal/interfaces/bot-session.interface";

export const imageURLs: Array<string> = [
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg0000.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg11111.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg54334.jpg",
  "http://www.realtygroup.info/images/realty/39072/viber image.jpg88888.jpg",
];

export async function templateOne(ctx: SessionContextFlavor) {
  let chatId: number = Number(ctx.chat?.id);
  let userSession = await getUserSession(ctx);

  ctx.api
    .sendMediaGroup(chatId, [
      {
        media: imageURLs[0],
        type: "photo",
      },
      {
        media: imageURLs[1],
        type: "photo",
      },
      {
        media: imageURLs[2],
        type: "photo",
      },
      {
        media: imageURLs[3],
        type: "photo",
        // caption: MessageBuilder.buildMessage(),
        // parse_mode: "HTML",
      },
    ])
    .then(async (messages) => {
      let item = await getRepository(Item).findOne(75001, {
        relations: ["categories"],
      });

      if (item) {
        ctx.reply(MessageBuilder.buildMessage(item), {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().text(
            "Дізнатись більше у менеджера",
            `${userSession.id}-1232534`
          ),
        });
      }

      // ctx.api.editMessageReplyMarkup(lastMesasge.chat.id, lastMesasge.message_id, {
      //   reply_markup: new InlineKeyboard().text('Ohaio', '1241256')
      // });

      // ctx.reply('Give me your phone', {
      //   reply_markup:
      //   {
      //     one_time_keyboard: true,
      //     keyboard: new Keyboard().requestContact('Share your phone number.').build(),
      //     resize_keyboard: true
      //   }
      // });

      ctx.api.sendContact(
        chatId,
        config.realtyGroup.MANAGER_PHONE as string,
        "Realty Group"
      );
    });
}

export async function initPropertyMenu(ctx: SessionContextFlavor) {
  let userSession = await getUserSession(ctx);
  sendMenu(ctx, getPropertyMenu(userSession));
}

export function registerMenuCallbacks(
  bot: Bot<SessionContextFlavor, Api<RawApi>>
) {
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

      sendMenu(ctx, getPropertyMenu(userSession));
    }
  );

  bot.on("message:text").filter(
    (ctx) => {
      return [
        Constants.ONE,
        Constants.TWO,
        Constants.THREE,
        Constants.FOUR_OR_MORE,
        addChecked(Constants.ONE),
        addChecked(Constants.TWO),
        addChecked(Constants.THREE),
        addChecked(Constants.FOUR_OR_MORE),
      ].includes(ctx.message.text);
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      userSession.menuStep = MenuStep.ROOM;

      let ONE_CHECKED = addChecked(Constants.ONE);
      let TWO_CHECKED = addChecked(Constants.TWO);
      let THREE_CHECKED = addChecked(Constants.THREE);
      let FOUR_OR_MORE_CHECKED = addChecked(Constants.FOUR_OR_MORE);

      switch (ctx.message.text) {
        case Constants.ONE:
        case ONE_CHECKED:
          toggleRoomFlag(userSession, RoomType.ONE);
          break;
        case Constants.TWO:
        case TWO_CHECKED:
          toggleRoomFlag(userSession, RoomType.TWO);
          break;
        case Constants.THREE:
        case THREE_CHECKED:
          toggleRoomFlag(userSession, RoomType.THREE);
          break;
        case Constants.FOUR_OR_MORE:
        case FOUR_OR_MORE_CHECKED:
          toggleRoomFlag(userSession, RoomType.FOUR_OR_MORE);
          break;
      }

      sendMenu(ctx, getRoomMenu(userSession));
    }
  );

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

      sendMenu(ctx, getPriceMenu(userSession));
    }
  );

  bot.on("message:text").filter(
    (ctx) => {
      return [
        Constants.TAVRICHESK,
        Constants.CENTER,
        Constants.ZHILPOSELOK,
        Constants.OSTROV,
        Constants.SHUMENSKIY,
        Constants.HBK,
        addChecked(Constants.TAVRICHESK),
        addChecked(Constants.CENTER),
        addChecked(Constants.ZHILPOSELOK),
        addChecked(Constants.OSTROV),
        addChecked(Constants.SHUMENSKIY),
        addChecked(Constants.HBK),
      ].includes(ctx.message.text);
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);
      userSession.menuStep = MenuStep.DISTRICT;

      let TAVRICHESK_CHECKED = addChecked(Constants.TAVRICHESK);
      let CENTER_CHECKED = addChecked(Constants.CENTER);
      let ZHILPOSELOK_CHECKED = addChecked(Constants.ZHILPOSELOK);
      let OSTROV_CHECKED = addChecked(Constants.OSTROV);
      let SHUMENSKIY_CHECKED = addChecked(Constants.SHUMENSKIY);
      let HBK_CHECKED = addChecked(Constants.HBK);

      switch (ctx.message.text) {
        case Constants.TAVRICHESK:
        case TAVRICHESK_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.TAVRICHESK);
          break;
        case Constants.CENTER:
        case CENTER_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.CENTER);
          break;
        case Constants.ZHILPOSELOK:
        case ZHILPOSELOK_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.ZHILPOSELOK);
          break;
        case Constants.OSTROV:
        case OSTROV_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.OSTROV);
          break;
        case Constants.SHUMENSKIY:
        case SHUMENSKIY_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.SHUMENSKIY);
          break;
        case Constants.HBK:
        case HBK_CHECKED:
          toggleDistrictFlag(userSession, DistrictType.HBK);
          break;
      }

      sendMenu(ctx, getDistrictMenu(userSession));
    }
  );

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
            sendMenu(ctx, getRoomMenu(userSession));
          } else {
            userSession.menuStep = MenuStep.PRICE;
            sendMenu(ctx, getPriceMenu(userSession));
          }
          break;
        case MenuStep.ROOM:
          userSession.menuStep = MenuStep.PRICE;
          sendMenu(ctx, getPriceMenu(userSession));
          break;
        case MenuStep.PRICE:
          userSession.menuStep = MenuStep.DISTRICT;
          sendMenu(ctx, getDistrictMenu(userSession));
          break;
        default:
          ctx.reply(MessageBuilder.buildFilter(userSession), {
            parse_mode: "HTML",
            reply_markup: {
              remove_keyboard: true,
            },
          });
          break;
      }
    }
  );

  bot.on("message:text").filter(
    (ctx) => {
      return ctx.message.text === Constants.READY;
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      ctx.reply(MessageBuilder.buildFilter(userSession), {
        parse_mode: "HTML",
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  );

  bot.on("message:text").filter(
    (ctx) => {
      return ctx.message.text === Constants.BACK;
    },
    async (ctx) => {
      let userSession = await getUserSession(ctx);

      switch (userSession.menuStep) {
        case MenuStep.DISTRICT:
          userSession.menuStep = MenuStep.PRICE;
          sendMenu(ctx, getPriceMenu(userSession));
          break;
        case MenuStep.PRICE:
          if (EnumHelper.hasApartmentsEnabled(userSession.propertyType)) {
            userSession.menuStep = MenuStep.ROOM;
            sendMenu(ctx, getRoomMenu(userSession));
          } else {
            userSession.menuStep = MenuStep.PROPERTY;
            sendMenu(ctx, getPropertyMenu(userSession));
          }
          break;
        case MenuStep.ROOM:
          userSession.menuStep = MenuStep.PROPERTY;
          sendMenu(ctx, getPropertyMenu(userSession));
          break;
        default:
          // should be unreachable
          // todo: add logging
          ctx.reply(MessageBuilder.buildFilter(userSession), {
            parse_mode: "HTML",
            reply_markup: {
              remove_keyboard: true,
            },
          });
          break;
      }
    }
  );
}

function getRoomMenu(userSession: BotSession): Keyboard {
  return new Keyboard()
    .text(buildCheckedMenu(Constants.ONE, userSession.roomType, RoomType.ONE))
    .text(buildCheckedMenu(Constants.TWO, userSession.roomType, RoomType.TWO))
    .row()
    .text(
      buildCheckedMenu(Constants.THREE, userSession.roomType, RoomType.THREE)
    )
    .text(
      buildCheckedMenu(
        Constants.FOUR_OR_MORE,
        userSession.roomType,
        RoomType.FOUR_OR_MORE
      )
    )
    .row()
    .text(Constants.BACK)
    .text(Constants.NEXT);
}

function getDistrictMenu(userSession: BotSession): Keyboard {
  return new Keyboard()
    .text(
      buildCheckedMenu(
        Constants.TAVRICHESK,
        userSession.districtType,
        DistrictType.TAVRICHESK
      )
    )
    .text(
      buildCheckedMenu(
        Constants.CENTER,
        userSession.districtType,
        DistrictType.CENTER
      )
    )
    .row()
    .text(
      buildCheckedMenu(
        Constants.ZHILPOSELOK,
        userSession.districtType,
        DistrictType.ZHILPOSELOK
      )
    )
    .text(
      buildCheckedMenu(
        Constants.OSTROV,
        userSession.districtType,
        DistrictType.OSTROV
      )
    )
    .row()
    .text(
      buildCheckedMenu(
        Constants.SHUMENSKIY,
        userSession.districtType,
        DistrictType.SHUMENSKIY
      )
    )
    .text(
      buildCheckedMenu(
        Constants.HBK,
        userSession.districtType,
        DistrictType.HBK
      )
    )
    .row()
    .text(Constants.BACK)
    .text(Constants.READY);
}

function getPriceMenu(userSession: BotSession): Keyboard {
  const keyboard = new Keyboard();

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

export function getPropertyMenu(userSession: BotSession): Keyboard {
  const keyboard = new Keyboard();

  keyboard.text(
    buildCheckedMenu(
      Constants.NEW_BUILDING,
      userSession.propertyType,
      PropertyType.NEW_BUILDING
    )
  );

  keyboard
    .text(
      buildCheckedMenu(
        Constants.APARTMENT,
        userSession.propertyType,
        PropertyType.APARTMENT
      )
    )
    .row();

  keyboard.text(
    buildCheckedMenu(
      Constants.HOUSE,
      userSession.propertyType,
      PropertyType.HOUSE
    )
  );

  keyboard
    .text(
      buildCheckedMenu(
        Constants.LAND,
        userSession.propertyType,
        PropertyType.LAND
      )
    )
    .row();

  keyboard
    .text(
      buildCheckedMenu(
        Constants.COMMERCIAL,
        userSession.propertyType,
        PropertyType.COMMERCIAL
      )
    )
    .row();

  keyboard.text(Constants.NEXT);

  return keyboard;
}

async function sendMenu(ctx: SessionContextFlavor, keyboard: Keyboard) {
  let userSession = await getUserSession(ctx);

  ctx.reply(MessageBuilder.buildFilter(userSession), {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: keyboard.build(),
      force_reply: true,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}
