import { LigaProValue } from "./liga-pro-value.type"

export type LigaProPrice = {
    currency: LigaProValue[],
    period: LigaProValue[],
    value: LigaProValue[]
}