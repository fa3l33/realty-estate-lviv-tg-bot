import Constants from "../bll/tg/constants";

export default class TextUtils {
  /**
   * Envelops value into html bold tag
   * @param value
   */
  public static toBold(value: string): string {
    return `<b>${value}</b>`;
  }

  /**
   * Envelops value into html italic tag
   */
  public static toItalic(value: string): string {
    return `<i>${value}</i>`;
  }

  /**
   * Envelops value into html underline tag
   */
  public static toUnderline(value: string): string {
    return `<u>${value}</u>`;
  }

  /**
   * Creates an html link
   */
  public static toLink(value: string, link: string): string {
    return `<a href="${link}">${TextUtils.toBold(value)}</a>`;
  }

  public static getDetailsData(userId: number, itemId: number): string {
    return `${Constants.PREFIX.DETAILS}${Constants.DELIMITER}${userId}${Constants.DELIMITER}${itemId}`;
  }

  public static getManagerData(userId: number, itemId: number): string {
    return `${Constants.PREFIX.MANAGER}${Constants.DELIMITER}${userId}${Constants.DELIMITER}${itemId}`;
  }  
}
