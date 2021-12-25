import { roomMenu } from './room-menu';
import { districtMenu } from './district-menu';
import { Menu } from '@grammyjs/menu';

import { propertyMenu } from './property-menu';
import { priceMenu } from './price-menu';

export default function getMenu(): Menu {
    propertyMenu.register(roomMenu);
    propertyMenu.register(districtMenu);
    propertyMenu.register(priceMenu);

    return propertyMenu;
}