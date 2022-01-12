import { InlineKeyboard, Keyboard } from "grammy";
import { ReplyKeyboardMarkup } from "grammy/out/platform.node";
import TextUtils from "../../common/text-utils";
import Constants from "./constants";

export default abstract class MarkupManager {
  public static getItemIK(
    userId: number,
    itemId: number
  ): InlineKeyboard {
    return new InlineKeyboard()
      .text("Детальніше", TextUtils.getDetailsData(userId, itemId))
      .text("Оператор", TextUtils.getManagerData(userId, itemId));
  }

  public static getConnectionK() : ReplyKeyboardMarkup {
    return {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .text(Constants.CALL_ME)
        .text(Constants.MESSAGE_ME).build(),
      resize_keyboard: true,
    };
  }

  public static getPhoneRequest() {
    return {
      one_time_keyboard: true,
      keyboard: new Keyboard()
        .requestContact("Поділитися номером телефону.")
        .build(),
      resize_keyboard: true,
    };
  }
}
