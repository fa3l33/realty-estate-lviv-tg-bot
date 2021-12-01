import { Context } from "grammy";

export default function cancel(ctx: Context) {
    ctx.reply("Cancel Command should return remove all filter for user and stop any notifications.");
}