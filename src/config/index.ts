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
    }
}