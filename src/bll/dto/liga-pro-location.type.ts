import { LigaProValue } from "./liga-pro-value.type";

export type LigaProLocation = {
    country: LigaProValue[],
    'locality-name': LigaProValue[],
    region: LigaProValue[],
    district: LigaProValue[],
    'sub-locality-name': LigaProValue[],
}