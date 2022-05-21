export default abstract class Constants {
  public static readonly STRING_EMPTY: string = "";
  public static readonly NEW_BUILDING: string = "Новобудови";
  public static readonly APARTMENT: string = "Квартири";
  public static readonly HOUSE: string = "Будинки";
  public static readonly LAND: string = "Земельна Ділянка";
  public static readonly COMMERCIAL: string = "Комерція";
  public static readonly ONE: string = "1";
  public static readonly TWO: string = "2";
  public static readonly THREE: string = "3";
  public static readonly FOUR_OR_MORE: string = "4 або більше";
  public static readonly SUB_DISTRICT = {
    VOENKA: "Воєнка",
    VOSTOCHNIY: "Східний",
    KINDIYKA: "Слобідка",
    STEKLOTARA: "Склотара",
    TEKSTILNIY: "Текстильний",
    HBK: "ХБК",
    ZHILPOSELOK: "Житмістечко",
    ZHILMASIV: "Жилмасив",
    ZABALKA: "Забалка",
    NEFTEGAVAN: "Нєфтегавань",
    OSTROV: "Острів",
    PORT_ELEVATOR: "Порт-Елеватор",
    PRIVOKZALNIY: "Привокзальна",
    SHUMENSKIY: "Шуменський",
    MELNIZA: "Млини",
    SEVERNIY_TAVRICHESK: "Північний-Таврійський",
    CENTR: "Центр",
  };
  public static readonly BACK: string = "⬅ Назад";
  public static readonly NEXT: string = "Далі ➡";
  public static readonly READY: string = "Завершити";
  public static readonly PRICES: Prices = {
    FROM_20_TO_40: "Від $20 тис. до $40 тис.",
    FROM_40_TO_60: "Від $40 тис. до $60 тис.",
    FROM_60_TO_100: "Від $60 тис. до $100 тис.",
    FROM_100_AND_MORE: "Від $100 тис. і більше",
  };

  public static readonly LIGA_PRO = {
    SUB_DISTRICT: {
      VOENKA: "Военка",
      VOSTOCHNIY: "Восточный",
      KINDIYKA: "Киндийка",
      STEKLOTARA: "Стеклотара",
      TEKSTILNIY: "Текстильный",
      HBK: "Хбк",
      ZHILPOSELOK: "Жилпоселок",
      ZABALKA: "Забалка",
      NEFTEGAVAN: "Нефтегавань",
      OSTROV: "Остров",
      SHUMENSKIY: "Шуменский",
      ZHILMASIV: "Жилмассив",
      MELNIZA: "Мельницы",
      PORT_ELEVATOR: "Порт-Порт-Элеватор",
      PRIVOKZALNIY: "Привокзальный",
      SEVERNIY_TAVRICHESK: "Северный-Таврический",
      CENTR: "Центр",
    },
    CATEGORY: {
      APARTMENT: "квартира",
      COMMERCIAL: "коммерция",
      HOUSE: "дом",
      LAND: "участок",
    },
    TYPE: {
      SALE: "продажа",
      RENT: "аренда",
    },
  };

  public static readonly APARTMENT_PRICES: ApartmentPrices = {
    FROM_20_TO_35: "Від $20 тис. до $35 тис.",
    FROM_35_TO_45: "Від $35 тис. до $45 тис.",
    FROM_45_TO_60: "Від $45 тис. до $60 тис.",
    FROM_60_AND_MORE: "Від $60 тис. і більше",
  };

  public static readonly CALL_ME = "Зателефонуйте мені";
  public static readonly MESSAGE_ME = "Напишіть мені";

  public static readonly PREFIX = {
    DETAILS: "details",
    MANAGER: "manager",
  };

  public static readonly DELIMITER = "-";
  public static readonly REGEX = {
    ITEM_DETAILS: `(${this.PREFIX.DETAILS}${this.DELIMITER}\\d+${this.DELIMITER}\\d+)`,
    MANAGER_CONNECTION: `(${this.PREFIX.MANAGER}${this.DELIMITER}\\d+${this.DELIMITER}\\d+)`,
    CONTACT_BY_PHONE_OR_MESSAGE: `${this.CALL_ME}|${this.MESSAGE_ME}`,
  };
}

interface Prices {
  FROM_20_TO_40: string;
  FROM_40_TO_60: string;
  FROM_60_TO_100: string;
  FROM_100_AND_MORE: string;
}

interface ApartmentPrices {
  FROM_20_TO_35: string;
  FROM_35_TO_45: string;
  FROM_45_TO_60: string;
  FROM_60_AND_MORE: string;
}
