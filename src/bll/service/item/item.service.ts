import { Repository, getRepository } from 'typeorm';
import { Item } from '../../../dal/model/rg_zoo/item';
import IItemService from "./iitem.service";

export default class ItemService implements IItemService {
  _itemRepository: Repository<Item>;

  constructor() {
    this._itemRepository = getRepository(Item);
  }

  public async getById(id: number) : Promise<Item | undefined> {
    return this._itemRepository.findOne(id, {
      relations: ["categories"]
    });
  }

  /**
   * getNotificationItems
   */
  public getNotificationItems(filterDateUnix: number): Promise<Item[]> {
    // todo: move to repository
    return this._itemRepository
      .createQueryBuilder("item")
      .innerJoinAndSelect("item.categories", "categories")
      .where(
        "item.type = :filterType AND UNIX_TIMESTAMP(item.created) > :filterDate" +
          " AND (SELECT rg_zoo_category_item.item_id FROM rg_zoo_category_item as rg_zoo_category_item WHERE rg_zoo_category_item.category_id = :filterCategoryId AND rg_zoo_category_item.item_id = item.id) IS NOT NULL",
        {
          filterDate: filterDateUnix,
          filterType: "realtyobject",
          filterCategoryId: 24,   // site filter
        }
      )
      .getMany();
  }
}