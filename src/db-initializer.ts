import { Item } from './dal/model/rg_zoo/item';
import { CategoryItem } from './dal/model/rg_zoo/category-item';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import config from "./config";
import { Category } from './dal/model/rg_zoo/category';
import { User } from './dal/model/tg/user';

export default function initializeDataBase(): Promise<Connection> {

    if (config.isProduction === 'TRUE')
    {
        return createConnection({
            "type": config.db_type,
            "host": config.db_host,
            "port": config.db_port,
            "username": config.db_username,
            "password": config.db_password,
            "database": config.db_database,
            "logging": false,
            synchronize: false,
            entities: [User, Category, CategoryItem, Item]
            } as ConnectionOptions);

    } else {
        // read connection option from file
        return createConnection();
    }
}