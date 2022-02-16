import { LigaProArea } from "./liga-pro-lot-area.type";
import { LigaProItem } from "./liga-pro-item.type";
import { LigaProPrice } from "./liga-pro-price.type";
import { LigaProLocation } from "./liga-pro-location.type";
import { LigaProValue } from "./liga-pro-value.type";

export default class LigaProItemDTO {
  constructor(item: LigaProItem) {
    this._attributes = item._attributes;
    this.category = item.category;
    this["creation-date"] = item["creation-date"];
    this.description = item.description;
    this.floor = item.floor;
    this.image = item.image;
    this.location = item.location;
    this.price = item.price;
    this.rooms = item.rooms;
    this.title = item.title;
    this["type"] = item["type"];
    this.url = item.url;
    this["lot-area"] = item["lot-area"];
    this.area = item.area;
    this['living-space'] = item['living-space'];
    this['kitchen-space'] = item['kitchen-space'];
  }

  _attributes: {
    "internal-id": string;
  };
  category: LigaProValue[];
  "creation-date": LigaProValue[];
  description: LigaProValue[];
  floor: LigaProValue[];
  "floors-total": LigaProValue[];
  image: LigaProValue[];
  location: LigaProLocation[];
  price: LigaProPrice[];
  "property-type": LigaProValue[];
  rooms: LigaProValue[];
  "sales-agent": any;
  title: LigaProValue[];
  "type": LigaProValue[];
  url: LigaProValue[];
  "lot-area": LigaProArea[];
  area: LigaProArea[];
  'living-space': LigaProArea[];
  'kitchen-space': LigaProArea[]

  getInternalId(): string {
    return this._attributes["internal-id"];
  }

  getCategory(): string {
    if (
      this.category &&
      this.category.length &&
      this.category[0]._text.length
    ) {
      return this.category[0]._text[0];
    }

    return "";
  }

  getDescription(): string {
    if (
      this.description &&
      this.description.length &&
      this.description[0]._text.length
    ) {
      return this.description[0]._text[0];
    }

    return "";
  }

  getFloor(): string {
    if (this.floor && this.floor.length && this["floor"][0]._text.length) {
      return this["floor"][0]._text[0];
    }

    return "";
  }

  getFloorTotal(): string {
    if (
      this["floors-total"] &&
      this["floors-total"].length &&
      this["floors-total"][0]._text.length
    ) {
      return this["floors-total"][0]._text[0];
    }

    return "";
  }

  getImagesURL(count: number = 0): string[] {
    if (this.image && this.image.length) {
      if (count) {
        return this.image.slice(0, count).map(img => img._text[0]);
      } else {
        return this.image.map(img => img._text[0]);
      }
    }

    return [];
  }

  getCountry(): string {
    if (
      this.location &&
      this.location.length &&
      this.location[0].country.length &&
      this.location[0].country[0]._text.length
    ) {
      return this.location[0].country[0]._text[0];
    }

    return "";
  }

  getLocalityName(): string {
    if (
      this.location &&
      this.location.length &&
      this.location[0]["locality-name"].length &&
      this.location[0]["locality-name"][0]._text.length
    ) {
      return this.location[0]["locality-name"][0]._text[0];
    }

    return "";
  }

  getRegion(): string {
    if (
      this.location &&
      this.location.length &&
      this.location[0].region.length &&
      this.location[0].region[0]._text.length
    ) {
      return this.location[0].region[0]._text[0];
    }

    return "";
  }

  getSubLocalityName(): string {
    if (
      this.location &&
      this.location.length &&
      this.location[0]["sub-locality-name"] &&
      this.location[0]["sub-locality-name"].length &&
      this.location[0]["sub-locality-name"][0]._text.length
    ) {
      return this.location[0]["sub-locality-name"][0]._text[0];
    }

    return "";
  }

  getRoomsCount(): string {
    if (this.rooms && this.rooms.length && this.rooms[0]._text.length) {
      return this.rooms[0]._text[0];
    }

    return "";
  }

  getTitle(): string {
    if (this.title && this.title.length && this.title[0]._text.length) {
      return this.title[0]._text[0];
    }

    return "";
  }

  getType(): string {
    if (this.type && this.type.length && this.type[0]._text.length) {
      return this.type[0]._text[0];
    }

    return "";
  }

  getURL(): string {
    if (this.url && this.url.length && this.url[0]._text.length) {
      return this.url[0]._text[0];
    }

    return "";
  }

  getPriceUSD(): string {
    if (
      this.price &&
      this.price.length &&
      this.price[0].currency.length &&
      this.price[0].currency[0]._text.length
    ) {
      return this.price[0].value[0]._text[0];
    }

    return "";
  }

  getLotAreaValue() {
    if (
      this["lot-area"] &&
      this["lot-area"].length &&
      this["lot-area"][0].value &&
      this["lot-area"][0].value.length &&
      this["lot-area"][0].value[0]._text &&
      this["lot-area"][0].value[0]._text.length
    ) {
      return this["lot-area"][0].value[0]._text[0];
    }

    return "";
  }

  getLotAreaUnit() {
    if (
      this["lot-area"] &&
      this["lot-area"].length &&
      this["lot-area"][0].unit &&
      this["lot-area"][0].unit.length &&
      this["lot-area"][0].unit[0]._text &&
      this["lot-area"][0].unit[0]._text.length
    ) {
      return this["lot-area"][0].unit[0]._text[0];
    }

    return "";
  }
  
  getAreaValue() {
    if (
      this["area"] &&
      this["area"].length &&
      this["area"][0].value &&
      this["area"][0].value.length &&
      this["area"][0].value[0]._text &&
      this["area"][0].value[0]._text.length
    ) {
      return this["area"][0].value[0]._text[0];
    }

    return "";
  }

  getAreaUnit() {
    if (
      this["area"] &&
      this["area"].length &&
      this["area"][0].unit &&
      this["area"][0].unit.length &&
      this["area"][0].unit[0]._text &&
      this["area"][0].unit[0]._text.length
    ) {
      return this["area"][0].unit[0]._text[0];
    }

    return "";
  }

  getLivingSpaceValue() {
    if (
      this["living-space"] &&
      this["living-space"].length &&
      this["living-space"][0].value &&
      this["living-space"][0].value.length &&
      this["living-space"][0].value[0]._text &&
      this["living-space"][0].value[0]._text.length
    ) {
      return this["living-space"][0].value[0]._text[0];
    }

    return "";
  }

  getLivingSpaceUnit() {
    if (
      this["living-space"] &&
      this["living-space"].length &&
      this["living-space"][0].unit &&
      this["living-space"][0].unit.length &&
      this["living-space"][0].unit[0]._text &&
      this["living-space"][0].unit[0]._text.length
    ) {
      return this["living-space"][0].unit[0]._text[0];
    }

    return "";
  }

  getKitchenSpaceValue() {
    if (
      this["kitchen-space"] &&
      this["kitchen-space"].length &&
      this["kitchen-space"][0].value &&
      this["kitchen-space"][0].value.length &&
      this["kitchen-space"][0].value[0]._text &&
      this["kitchen-space"][0].value[0]._text.length
    ) {
      return this["kitchen-space"][0].value[0]._text[0];
    }

    return "";
  }

  getKitchenSpaceUnit() {
    if (
      this["kitchen-space"] &&
      this["kitchen-space"].length &&
      this["kitchen-space"][0].unit &&
      this["kitchen-space"][0].unit.length &&
      this["kitchen-space"][0].unit[0]._text &&
      this["kitchen-space"][0].unit[0]._text.length
    ) {
      return this["kitchen-space"][0].unit[0]._text[0];
    }

    return "";
  }
}
