import { SessionContextFlavor } from "../session-context";

export default async function cancel(ctx: SessionContextFlavor) {
    ctx.reply("Cancel Command should return remove all filter for user and stop any notifications.");
}