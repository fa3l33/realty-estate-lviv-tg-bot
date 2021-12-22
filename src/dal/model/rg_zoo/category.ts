import { Item } from './item';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Export only used columns.
 */
@Entity('rg_zoo_category')
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    name!: string;

    @ManyToMany(() => Item, item => item.categories)
    items!: Item[];
}