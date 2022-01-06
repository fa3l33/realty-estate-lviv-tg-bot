import { ItemElementMap } from "./../dal/item-element-map";
import { ItemElementType } from "./../dal/enums/tg/item-elemnt-type";
import logger from "./logger";

export default abstract class ElementParser {
  private static readonly VALUE: string = "value";
  private static readonly FIRST_PROPERTY = "0";
  private static readonly OPTION: string = "option";

  /**
   *
   * @param elements can be a raw item's elements string value or already parsed object
   * @param itemElementType
   * @returns
   */
  public static getValue(
    elements: any,
    itemElementType: ItemElementType
  ): string | undefined {
    try {
        let values: any = this.getRawValues(elements, itemElementType);

        if (
          values &&
          values[this.FIRST_PROPERTY] &&
          values[this.FIRST_PROPERTY][this.VALUE]
        ) {
          return values[this.FIRST_PROPERTY][this.VALUE] as string;
        }
    } catch (error) {
      logger.error(error, "Unable to parser item's elements property.");
    }

    return undefined;
  }

  public static getOption(
    elements: string,
    itemElementType: ItemElementType
  ): string | undefined {
    try {
      let values: any = this.getRawValues(elements, itemElementType);

      if (
        values &&
        values[this.OPTION] &&
        values[this.OPTION][this.FIRST_PROPERTY]
      ) {
        return values[this.OPTION][this.FIRST_PROPERTY] as string;
      }
    } catch (error) {
      logger.error(error, "Unable to parser item's elements property.");
    }

    return undefined;
  }

  private static getRawValues(
    elements: any,
    itemElementType: ItemElementType
  ): any | undefined {
    try {
      if (elements) {
        let elementsAsObj: any;

        if (typeof elements === "string") {
          elementsAsObj = JSON.parse(elements);
        }

        if (typeof elements === "object") {
          elementsAsObj = elements;
        }

        return elementsAsObj[ItemElementMap.get(itemElementType)!];
      }
    } catch (error) {
      logger.error(error, "Unable to parser item's elements property.");
    }
    return undefined;
  }
}
