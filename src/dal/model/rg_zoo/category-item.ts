import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Export only used columns.
 */
@Entity('rg_zoo_category_item')
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    name!: string;
}