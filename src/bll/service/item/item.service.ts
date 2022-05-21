import ILigaProPortingService from '../iligapro-porting.service';
import IItemService from "./iitem.service";
import dayjs = require('dayjs');
import LigaProItemDTO from '../../dto/liga-pro-item.dto';

export default class ItemService implements IItemService {
  private readonly _ligaProPortingService: ILigaProPortingService;

  constructor(ligaProPortingService: ILigaProPortingService) {
    this._ligaProPortingService = ligaProPortingService;
  }

  public getById(id: number) : LigaProItemDTO | undefined {
    var itemsMap: Map<string, LigaProItemDTO> = this._ligaProPortingService.getItems();
    return itemsMap.get(id.toString());
  }

  /**
   * getNotificationItems
   */
  public getNotificationItems(filterDateUnix: number): LigaProItemDTO[] {
    // todo: move to repository
    const itemsMap: Map<string, LigaProItemDTO> = this._ligaProPortingService.getItems();
    let items: LigaProItemDTO[] = [];

    for (const item of itemsMap.values()) {
      const creationDate = dayjs(item['creation-date'][0]._text[0]);

      const creationDateUnix = creationDate.unix();
      console.log(creationDateUnix);
      console.log(creationDate.unix() > filterDateUnix);

      if (creationDate.unix() > filterDateUnix) {
        items.push(item);
      }
    }

    return items;
  }
}