import { roomMenu } from './room-menu';
import { districtMenu } from './district-menu';
import { Menu } from '@grammyjs/menu';

import { propertyMenu } from './property-menu';

export default function getMenu(): Menu {
    propertyMenu.register(roomMenu);
    propertyMenu.register(districtMenu);

    return propertyMenu;
}