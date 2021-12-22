import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";


@Entity("rg_zoo_item")
export class Item {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id!: number;

    // all requests should be filtered by 'realtyobject' type
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    type!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    name!: string;

    // english representation
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    alias!: string

    @Column({
        type: 'datetime',
        nullable: false
    })
    created!: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        name: 'publish_up'
    })
    publishUp!: Date;

    // looks like is never used
    @Column({
        type: 'datetime',
        nullable: false,
        name: 'publish_down'
    })
    publishDown!: Date;

    @Column({
        type: 'longtext',
        nullable: false
    })
    elements!: string;

    @Column({
        type: 'longtext',
        nullable: false
    })
    params!: string;

    @ManyToMany(() => Category, category => category.items)
    @JoinTable({
        name: 'rg_zoo_category_item',
        joinColumn: {
            name: 'item_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    categories!: Category[];
}