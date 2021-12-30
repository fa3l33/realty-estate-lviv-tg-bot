import { config } from "dotenv"

config()

export default {
    telegram: {
        BOT_SECRET_KEY: process.env.TG_BOT_SECRET_KEY
    },
    realtyGroup: {
        SITE_URL: process.env.RG_SITE_URL,
        ITEM_URL: process.env.RG_ITEM_URL,
        MANAGER_PHONE: process.env.RG_MANAGER_PHONE,
    },
    isProduction: process.env.IS_PRODUCTION,
    db_type: process.env.DB_TYPE,
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || '3306',
    db_database: process.env.DB_DATABASE,
    db_username:  process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD
}