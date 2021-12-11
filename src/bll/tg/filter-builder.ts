import BotSession from "../../dal/interfaces/bot-session.interface";
import { districtEnumToString, hasApartmentsEnabled, propertyEnumToString, roomEnumToString } from "../enum-helper";

export function buildFilter(userSession: BotSession) {
    return `<b>YOURS FILTERS</b>

<u><b>Район: </b></u> ${districtEnumToString(userSession.districtType)}
<u><b>Категория Обьекта: </b></u> ${propertyEnumToString(userSession.propertyType)}
${hasApartmentsEnabled(userSession.propertyType) ? "<u><b>Кроичество Комнат: </b></u>" + roomEnumToString(userSession.roomType) +"\n" : ""}<u><b></b></u>
`;
}