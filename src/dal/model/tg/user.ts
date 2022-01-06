import { ApartmentPriceType } from './../../enums/apartment-price-type';
import { PriceType } from './../../enums/price-type';
import { DistrictType } from './../../enums/disctrict-type';
import { RoomType } from './../../enums/room-type';
import { PropertyType } from './../../enums/property-type';
import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';
import { MenuStep } from '../../enums/menu-step-type';

@Entity('tg_user')
export class User {
  /** Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  @PrimaryColumn({
    unique: true
  })
  id!: number;
  /** True, if this user is a bot */
  @Column()
  isBot!: boolean;
  /** User's or bot's first name */
  @Column()
  firstName!: string;
  /** User's or bot's last name */
  @Column()
  lastName?: string;
  /** User's or bot's username */
  @Column()
  username?: string;
  @Column({
    nullable: true,
    default: null
  })
  phoneNumber?: string;
  @Column({
    nullable: false,
  })
  chatId!: number;
  @Column({
    type: 'smallint',
  })
  propertyType!: PropertyType;
  @Column({
    type: 'smallint',
  })
  roomType!: RoomType;
  @Column({
    type: 'smallint',
  })
  districtType!: DistrictType;
  @Column({
    type: 'smallint',
  })
  priceType!: PriceType;
  @Column({
    type: 'smallint',
  })
  apartmentPriceType!: ApartmentPriceType;
  @Column({
    type: 'smallint',
  })
  menuStep!: MenuStep;
  // determine if user wants to receive updates
  @Column()
  isActive!: boolean;
  // time when user started to use bot
  @Column()
  startTS!: Date;
  // last time filter was updated
  @Column()
  lastUpdateTS!: Date;
  // last notification send date
  @Column({
    nullable: true,
    default: null
  })
  notifiedAtTS?: Date;
}
