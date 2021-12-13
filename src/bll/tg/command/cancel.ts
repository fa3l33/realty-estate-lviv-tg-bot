import { SessionContextFlavor } from "../session-context";

export default function cancel(ctx: SessionContextFlavor) {
    ctx.reply("Cancel Command should return remove all filter for user and stop any notifications.");
}