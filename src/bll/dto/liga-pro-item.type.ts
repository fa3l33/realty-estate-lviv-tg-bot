import { LigaProArea } from './liga-pro-lot-area.type';
import { LigaProLocation } from "./liga-pro-location.type";
import { LigaProPrice } from "./liga-pro-price.type";
import { LigaProValue } from "./liga-pro-value.type";

export type LigaProItem = {
    _attributes: {
        'internal-id': string
    };
    category: LigaProValue[];
    'creation-date': LigaProValue[];
    description: LigaProValue[];
    floor: LigaProValue[];
    'floors-total': LigaProValue[];
    image: LigaProValue[];
    location: LigaProLocation[];
    price: LigaProPrice[];
    'property-type': LigaProValue[];
    rooms: LigaProValue[];
    'sales-agent': any;
    title: LigaProValue[];
    'type': LigaProValue[];
    url: LigaProValue[];
    'lot-area': LigaProArea[]
    area: LigaProArea[],
    'living-space': LigaProArea[],
    'kitchen-space': LigaProArea[],
}